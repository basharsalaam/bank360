import styled from "styled-components";

export const AvatarStyle = styled.figure`
    .avatar-initials,
    .avatar-image {
        height: 46px;
        width: 46px;
        border-radius: 6px;
        object-fit: cover;
        box-shadow: 0px 4px 8px rgb(171 174 185 / 24%);
    }

    .avatar-initials {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f6da8d;
        border: 2px solid #ffffff;

        font-weight: 600;
        font-size: 2em;
        line-height: 22px;
        color: #6b4700;
        box-shadow: 0px 4px 8px rgba(171, 174, 185, 0.24);
    }
`;
