import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";

const ViewPhotoModal = () => {
  const { isOpen, onClose, user, type } = useModal();

  const isModalOpen = isOpen && type === "openPicture";

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent
        className={
          "bg-mainPrimaryDark rounded-xl overflow-hidden border-none p-0"
        }
      >
        <Image src={user?.profile!} height={400} width={600} alt="loading.." />
      </DialogContent>
    </Dialog>
  );
};

export default ViewPhotoModal;
