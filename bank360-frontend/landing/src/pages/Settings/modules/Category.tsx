import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { Icons } from "../../../assets/icons";
import { Illustrations } from "../../../assets/illustrations";
import { DropdownComp } from "../../../frontend-components/Dropdown/Dropdown";
import Loader from "../../../frontend-components/Loader/Loader";
import { ModalComp } from "../../../frontend-components/ModalComp/ModalComp";
import {
  AddCategoryModal,
  SuccessModal,
} from "../../../frontend-components/ModalComp/style";

import { ISelectOption } from "../../../frontend-components/Select/Select.interface";
import { useCreateCategoryMutation } from "../../../features/services";
import { ICategoryInfo } from "../../../features/services/services.interface";
import { useGetCategories } from "../../../hooks/finUtils/useGetCategoryList";
import { useGetTokens } from "../../../hooks/getDataFromStore/getDataFromState";
import { formatDate, getTime } from "../../../utils/helpers/display";
import { SettingsHeader } from "./SettingsHeader";

export const Category: FC<ICategoryProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const { categories, loading, getCategories } = useGetCategories();
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [{ category, id, method }, setCategory] = useState({
    category: "",
    id: "",
    method: "POST",
  });
  const [error, setError] = useState(false);
  const [create] = useCreateCategoryMutation();
  const { access } = useGetTokens();
  const createCategory = () => {
    if (!category && method === "POST") {
      setError(true);
      return;
    }
    setCreating(true);
    create({
      accessToken: access,
      category: category,
      method: method as "POST" | "PATCH" | "DELETE",
      id,
    })
      .unwrap()
      .then((res) => {
        setOpenAddCategoryModal(false);
        setOpenSuccessModal(true);
        setOpenWarningModal(false);
        setCategory((prev) => ({
          ...prev,
          category: "",
          id: "",
          // method: "POST",
        }));

        // update the categories list
        getCategories();
      })
      .catch((err) => {
        toast.error(
          err.detail ||
            "An error occured while creating a category. Please try again."
        );
      })
      .finally(() => {
        setCreating(false);
      });
  };

  const editCategory = (cat: ICategoryInfo) => {
    if (cat.default) {
      toast.error("This is a default category. You cannot edit it.");
      return;
    }
    setOpenAddCategoryModal(true);
    setCategory((prev) => ({
      category: cat.category,
      id: cat.id.toString(),
      method: "PATCH",
    }));
  };

  const deleteCategory = (cat: ICategoryInfo) => {
    if (cat.default) {
      toast.error("This is a default category. You cannot delete it.");
      return;
    }
    setOpenWarningModal(true);
    setCategory((prev) => ({
      category: cat.category,
      id: cat.id.toString(),
      method: "DELETE",
    }));
  };

  return (
    <>
      <SettingsHeader
        header="Categories"
        buttonLabel="Create Category"
        buttonClick={() => {
          setCategory((prev) => ({
            method: "POST",
            category: "",
            id: "",
          }));
          setOpenAddCategoryModal(true);
        }}
      />

      <div className="table-container">
        <table>
          <tr>
            <th className="catr">Category</th>
            <th className="dater">Date Created</th>
            <th>Action</th>
          </tr>
          {!loading ? (
            categories.map((cat) => (
              <tr>
                <td className="category catr">{cat.category}</td>
                <td className="date dater">
                  {formatDate(cat.created_at) + " - " + getTime(cat.created_at)}
                </td>
                <td>
                  <DropdownComp>
                    <section className="dropdown-cont">
                      <button
                        className="dropdown-cont__item"
                        onClick={() => {
                          editCategory(cat);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="dropdown-cont__item"
                        onClick={() => {
                          deleteCategory(cat);
                        }}
                      >
                        Remove
                      </button>
                    </section>
                  </DropdownComp>
                </td>
              </tr>
            ))
          ) : (
            <Loader />
          )}
        </table>
      </div>
      <ModalComp open={openAddCategoryModal} setOpen={setOpenAddCategoryModal}>
        <AddCategoryModal>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              createCategory();
            }}
          >
            <section className="top">
              <h2>{method === "POST" ? "Create" : "Edit"} Category</h2>
              <input
                type="text"
                placeholder="Enter name of category"
                onChange={(event) => {
                  setError(false);
                  setCategory((prev) => ({
                    ...prev,
                    category: event.target.value,
                  }));
                }}
                value={category}
              />
              {error && (
                <small className="error">Please enter a category name</small>
              )}
            </section>
            <section className="bottom">
              <button
                className="outline-btn"
                onClick={() => {
                  setOpenAddCategoryModal(false);
                }}
                type="button"
              >
                Cancel
              </button>
              <button className="filled-btn" disabled={creating} type="submit">
                {creating
                  ? "Creating"
                  : `${method === "POST" ? "Create" : "Edit"} Category`}
              </button>
            </section>
          </form>
        </AddCategoryModal>
      </ModalComp>
      <ModalComp open={openSuccessModal} setOpen={setOpenSuccessModal}>
        <SuccessModal>
          <button
            className="close-btn"
            onClick={() => {
              setOpenSuccessModal(false);
            }}
          >
            <Icons.CloseIcon />
          </button>
          <h2>
            {method === "POST"
              ? "Created Succesfully"
              : method === "PATCH"
              ? "Updated Successfully"
              : "Deleted Successfully"}
          </h2>
          <p>
            Your category has been successfully{" "}
            {method === "POST"
              ? "created"
              : method === "PATCH"
              ? "updated"
              : "deleted"}
            {method === "POST" ? ", you can now use it" : ""}.
          </p>
          <button
            className="back-btn"
            onClick={() => {
              setOpenSuccessModal(false);
              setOpenWarningModal(false);
            }}
          >
            Go back
          </button>
          {method === "POST" ? (
            <p className="foot-txt">
              Create another category?{" "}
              <button
                className="click-btn"
                onClick={() => {
                  setOpenSuccessModal(false);
                  setOpenAddCategoryModal(true);
                }}
              >
                Click here
              </button>
            </p>
          ) : (
            ""
          )}
        </SuccessModal>
      </ModalComp>

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
            <Illustrations.Illustration2 />
            <h2>Are you sure you want to remove</h2>
            <p>
              This action is not reversible. Be sure you want to delete this
              category before you go ahead.
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
              className="filled-btn"
              disabled={creating}
              onClick={() => {
                createCategory();
              }}
            >
              {creating ? "Deleting" : "Delete Category"}
            </button>
          </section>
        </SuccessModal>
      </ModalComp>
    </>
  );
};

interface ICategoryProps {
  selectedDate: ISelectOption;
  setSelectedDate: React.Dispatch<React.SetStateAction<ISelectOption>>;
}
