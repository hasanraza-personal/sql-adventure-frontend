import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Context } from "../context/ContextProvider";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  // console.log("name: ", name);
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 130, // Specify the desired width
      height: 130,
      fontSize: 40,
    },

    children: `${name[0] ? name[0][0].toUpperCase() : ""}${
      name[1] ? name[1][0].toUpperCase() : ""
    }`,
    // children: `${name}`,
  };
}

export default function BackgroundLetterAvatars() {
  const { user } = React.useContext(Context);
  // console.log("user: ", user);
  return (
    <Stack>
      {user && (
        <Avatar
          className="font-press-start-2p w-[200px] "
          sx={{ width: 1, height: 200 }}
          {...stringAvatar(user ? user.name : "user")}
        />
      )}
    </Stack>
  );
}
