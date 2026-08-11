import { useFormik } from "formik";
import React, { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { Icons } from "../../../assets/Icons";
import { Illustrations } from "../../../assets/Illustrations";
import { Component } from "../../../components";
import Input from "../../../components/Input/Input";
import Loader from "../../../components/Loader/Loader";
import { ModalComp } from "../../../components/ModalComp/ModalComp";
import { SuccessModal } from "../../../components/ModalComp/style";
import {
  useDeleteUserMutation,
  useGetUserDataMutMutation,
  useUpdateProfileImageMutation,
  useUpdateUserDataMutation,
} from "../../../features/services";
import { updateUserData } from "../../../features/userData/userData.slice";
import {
  useGetTokens,
  useGetUserData,
} from "../../../hooks/getDataFromStore/getDataFromState";
import { profileValidationSchema } from "./ProfileSchema";

export const Profile: FC = () => {
  const userData = useGetUserData();
  const [updateUser] = useUpdateUserDataMutation();
  const { access } = useGetTokens();

  const dispatch = useAppDispatch();
  const [updating, setUpdating] = useState(false);
  const [getUser] = useGetUserDataMutMutation();
  const refreshUserInState = () => {
    getUser({ accessToken: access })
      .unwrap()
      .then((res) => {
        dispatch(updateUserData(res));
      })
      .catch((err) => {
        console.log(err);
        refreshUserInState();
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setUpdating(true);
      values.phone_no = "+" + values.phone_no;
      updateUser({
        accessToken: access,
        userId: userData.uuid,
        body: values,
      })
        .unwrap()
        .then((res) => {
          toast.success("Profile updated successfully");
          refreshUserInState();
        })
        .catch((err) => {
          toast.error(
            (Object.values(err.data)[0] as string) ||
              "An error occured while updating profile"
          );
        })
        .finally(() => {
          setUpdating(false);
        });
    },
    validationSchema: profileValidationSchema,
    enableReinitialize: true,
  });

  const [currentImage, setCurrentImage] = useState("");
  useEffect(() => {
    formik.setValues({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      phone_no: userData.phone_no,
    });
    setCurrentImage(userData.avatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [selectedImage, setSelectedImage] = useState<
  //   string | ArrayBuffer | null
  // >("");
  const [updateImage] = useUpdateProfileImageMutation();
  const [updatingImage, setUpdatingImage] = useState(false);

  const updateProfileImage = ({ formData }: { formData: any }) => {
    setUpdatingImage(true);
    updateImage({
      accessToken: access,
      userId: userData.uuid,
      body: formData,
    })
      .unwrap()
      .then((res: any) => {
        setCurrentImage("");
        setCurrentImage(res.avatar);
        refreshUserInState();
      })
      .catch((err: any) => {
        toast.error(
          (Object.values(err.data)[0] as string) ||
            "An error occured while updating profile image"
        );
      })
      .finally(() => {
        setUpdatingImage(false);
      });
  };
  const clearProfileImage = () => {
    const formData = new FormData();
    formData.append("avatar", "");
    updateProfileImage({ formData });
  };
  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      const file = ev.target.files[0];
      const formData = new FormData();
      if (file) {
        // send image to api
        formData.append("avatar", file);
        updateProfileImage({ formData });
      }
    }
  };

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();
  const deleteAccount = () => {
    setDeleting(true);
    deleteUser({
      accessToken: access,
      id: userData.uuid,
    })
      .unwrap()
      .then((res) => {
        toast.success("Your records have been deleted successfully");
        // updateAccounts();
        navigate("/signin");
        setOpenWarningModal(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  return !userData.uuid ? (
    <Loader />
  ) : (
    <>
      <section className="overview">
        <section className="outline-card overview__w50">
          <h4>Personal Details</h4>
          <form action="" onSubmit={formik.handleSubmit}>
            <section className="form-flex">
              <Input
                label="First name "
                type="text"
                keyValue="first_name"
                formik={formik}
                width="48%"
                required
              />
              <Input
                label="Last name "
                type="text"
                keyValue="last_name"
                formik={formik}
                width="48%"
                required
              />
              <Input
                label="Email address "
                type="email"
                keyValue="email"
                formik={formik}
                width="100%"
                required
              />
              <Input
                label="Phone number"
                type="tel"
                keyValue="phone_no"
                formik={formik}
                width="100%"
                required
              />
            </section>

            <button
              className="save-btn"
              disabled={!formik.isValid || updating}
              type="submit"
            >
              {updating ? "Updating Profile" : "Save Changes"}
            </button>
          </form>
        </section>
        <section className="overview__w35">
          <section className="outline-card">
            <h4>Profile Picture</h4>
            <p>
              Upload your photo, so team members know who exactly they working
              with
            </p>

            <div className="flex">
              <Component.Avatar
                first_name={userData.first_name}
                last_name={userData.last_name}
                className="avatar-card"
                src={currentImage}
              />
              <aside className="right">
                <div className="buttons">
                  <button
                    className="change-btn"
                    onClick={() => {
                      inputRef.current?.click();
                    }}
                    disabled={updatingImage || !userData.uuid}
                  >
                    {updatingImage ? <Loader noPadding /> : "Change picture"}
                  </button>

                  <input
                    type="file"
                    name=""
                    id=""
                    className="hidden"
                    ref={inputRef}
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                    accept="image/png, image/jpeg, image/jpg"
                  />
                  {currentImage && (
                    <button
                      className="remove-btn"
                      onClick={() => {
                        clearProfileImage();
                      }}
                      disabled={updatingImage || !userData.uuid}
                    >
                      {updatingImage ? <Loader noPadding /> : "Remove"}
                    </button>
                  )}
                </div>
                <div className="avatar-info">
                  <p>Max mb: 1mb</p>
                  <div className="divide"></div>
                  <p>Accept: png, jpeg</p>
                </div>
              </aside>
            </div>
          </section>
          <section className="outline-card outline-card__delete">
            <h4 className="outline-card__delete-header">Delete Account</h4>
            <p>
              Click the button below to delete your account. Note that this
              clears all your data from our records and this action is
              non-reversible
            </p>

            <div className="flex">
              <aside className="">
                <div className="buttons">
                  <button
                    className="change-btn outline-card__delete-btn"
                    onClick={() => {
                      setOpenWarningModal(true);
                    }}
                    disabled={deleting}
                  >
                    {updatingImage ? <Loader noPadding /> : "Delete account"}
                  </button>
                </div>
              </aside>
            </div>
          </section>
        </section>
      </section>

      <ModalComp open={openWarningModal} setOpen={setOpenWarningModal}>
        <SuccessModal className="rem-pad">
          <button
            className="close-btn"
            onClick={() => {
              setOpenWarningModal(false);
            }}
          >
            <Icons.CloseIcon />
          </button>
          <section className="top">
            <Illustrations.WarningIllustration />
            <h2>Are you sure you want to delete your account</h2>
            <p>
              Be sure you want to delete your account before you go ahead. This
              clears all your data from our records and it is non-reversible
            </p>
          </section>

          <section className="bottom">
            <button
              className="outline-btn"
              onClick={() => {
                setOpenWarningModal(false);
              }}
              type="button"
            >
              Cancel
            </button>
            <button
              className="filled-btn filled-btn__danger"
              disabled={deleting}
              onClick={() => {
                deleteAccount();
              }}
            >
              {deleting ? "Deleting" : "Delete Account"}
            </button>
          </section>
        </SuccessModal>
      </ModalComp>
    </>
  );
};

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_no: "",
};
