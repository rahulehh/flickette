import { useState, useContext, useEffect } from "react";
import { EditButton } from "./Buttons";
import { AppThemeContext } from "../context/AppThemeProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import HandleProfileUpdate from "../hooks/HandleProfileUpdate";
import HandleLogUpdate from "../hooks/HandleLogUpdate";
import HandleMovieLog from "../hooks/HandleMovieLog";
import { SaveButton } from "./Buttons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export const EditProfileModal = (userData) => {
  const [open, setOpen] = useState(false);

  const ud = userData.userData;

  const [name, setName] = useState(ud.name);
  const [username, setUsername] = useState(ud.username);
  const [bio, setBio] = useState(ud.bio);

  const { appTheme } = useContext(AppThemeContext);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { updateProfile } = HandleProfileUpdate();

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");

    if (appTheme == "dark-theme") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  });

  const handleEdit = async () => {
    let currentUser = JSON.parse(localStorage.getItem("user"));
    currentUser.name = name;
    currentUser.username = username;
    currentUser.bio = bio;
    localStorage.setItem("user", JSON.stringify(currentUser));
    await updateProfile({ username, name, bio });
    setOpen(false);
    window.location.reload();
  };

  return (
    <>
      <EditButton type="button" onClick={handleOpen}>
        edit
      </EditButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="base-modal-styles">
          <Box sx={style}>
            <h3> Edit your profile</h3>
            <div id="edit-contents">
              <h4>Name</h4>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <h4>Username</h4>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <h4>Bio</h4>
              <textarea
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <SaveButton onClick={handleEdit}>Save</SaveButton>
            </div>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export const LogEditModal = (data) => {
  const { updateLog } = HandleLogUpdate();
  const { appTheme } = useContext(AppThemeContext);
  const { logData, rt } = data;

  const [open, setOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const handleEdit = async () => {
    await updateLog({ id: logData.log_id, review: reviewText });
    setOpen(false);
    alert("Log updated");
    window.location.reload();
  };

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    setReviewText(rt);

    if (appTheme == "dark-theme") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }, [appTheme, rt]);

  return (
    <>
      <EditButton
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </EditButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="base-modal-styles">
          <Box sx={style}>
            {" "}
            <h2>
              {logData.title} · {logData.year}
            </h2>
            <p>
              Log date:{" "}
              {new Date(logData.log_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <textarea
              style={{ display: "block" }}
              name="review"
              id="rev"
              cols="30"
              rows="10"
              value={reviewText}
              placeholder="write your review here "
              onChange={(e) => setReviewText(e.target.value)}
            />
            <SaveButton
              sx={{ display: "block", marginTop: "1rem" }}
              onClick={handleEdit}
            >
              Save
            </SaveButton>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export const LogNew = (data) => {
  const { movieData } = data;
  const { appTheme } = useContext(AppThemeContext);
  const [open, setOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const { logMovie } = HandleMovieLog();

  const handleSave = () => {
    logMovie({ imdbId: movieData.imdbId, review: reviewText });
    setOpen(false);
  };

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");

    if (appTheme == "dark-theme") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }, [appTheme]);

  return (
    <>
      <EditButton
        type="button"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add
      </EditButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="base-modal-styles">
          <Box sx={style}>
            <h2>
              {movieData.title} · {movieData.year}
            </h2>

            <p>{movieData.stype}</p>
            <textarea
              name="review"
              id="rev"
              cols="30"
              rows="10"
              value={reviewText}
              placeholder="write your review here "
              onChange={(e) => setReviewText(e.target.value)}
              style={{ display: "block" }}
            />
            <SaveButton
              sx={{ display: "block", marginTop: "1rem" }}
              onClick={handleSave}
            >
              Save
            </SaveButton>
          </Box>
        </div>
      </Modal>
    </>
  );
};
