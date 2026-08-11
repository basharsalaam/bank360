import React, { FC } from "react";
import { IAvatarProps } from "./Avatar.interface";
import { AvatarStyle } from "./Avatar.style";

const Avatar: FC<IAvatarProps> = ({
    first_name,
    last_name,
    src,
    alt,
    className,
}) => {
    return (
        <AvatarStyle className={className}>
            {/* If theres an image source */}
            {src && <img src={src} alt={alt} className="avatar-image" />}

            {/* Otherwise, use initials */}
            {!src && (
                <span className="avatar-initials">
                    {first_name[0]}
                    {last_name[0]}
                </span>
            )}
        </AvatarStyle>
    );
};

export default Avatar;
