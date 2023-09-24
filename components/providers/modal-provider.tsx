"use client";
import React from "react";
import ViewPhotoModal from "../modals/view-photo-modal";
import CapturePicture from "../modals/capture-picture";
import { CreateContact } from "../modals/create-contact";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ViewPhotoModal />
      <CapturePicture />
      <CreateContact />
    </>
  );
};

export default ModalProvider;
