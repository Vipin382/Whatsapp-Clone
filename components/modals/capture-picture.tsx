import React from "react";
import Webcam from "react-webcam";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SlArrowRight } from "react-icons/sl";
import { useModal } from "@/hooks/use-modal-store";
import { HiMiniCamera } from "react-icons/hi2";
import Image from "next/image";
import IconButton from "../common/IconButton";
import { updateUserProfile } from "@/app/api/updateUser";
import { Loader2Icon } from "lucide-react";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const CapturePicture = () => {
  const { isOpen, onClose, type, getUser, getContacts } = useModal();
  const [image, setImage] = React.useState<string | null>();
  const webcamRef = React.useRef() as React.MutableRefObject<Webcam>;
  const [loading, setLoading] = React.useState<boolean>(false);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const isModalOpen = isOpen && type === "takePicture";

  const stopCam = React.useCallback(() => {
    let stream = webcamRef.current?.stream;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
  }, [webcamRef.current]);

  const uploadImageToSupabase = async () => {
    setLoading(true);
    try {
      await updateUserProfile({ image: image! });
      getUser();
      getContacts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };
  const handleClose = () => {
    setImage("");
    stopCam();
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={() => handleClose()}>
      <DialogContent
        className={
          "bg-mainPrimaryDark focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none rounded-none border-none  p-0"
        }
      >
        <div className=" h-8"></div>
        {image ? (
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center bg-mainPrimaryDark/40">
                <Loader2Icon className="mr-2 text-chatbackground h-12 w-12 animate-spin" />
              </div>
            )}
            <Image src={image} alt="loading..." height={600} width={600} />
            {!loading && (
              <div className="w-full -m-6  flex justify-end">
                <IconButton
                  onClick={uploadImageToSupabase}
                  className="rounded-full h-10 w-10 cursor-pointer text-white shadow-lg hover:bg-chatbackground bg-chatbackground"
                >
                  <SlArrowRight />
                </IconButton>
              </div>
            )}
          </div>
        ) : (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              open={isModalOpen}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
            <div className="w-full flex justify-center -mt-10">
              <IconButton
                onClick={capture}
                className="rounded-full h-10 w-10 cursor-pointer text-white hover:bg-chatbackground bg-chatbackground"
              >
                <HiMiniCamera className="cursor-pointer" size={20} />
              </IconButton>
            </div>
          </>
        )}

        <div className="h-12"></div>
      </DialogContent>
    </Dialog>
  );
};

export default CapturePicture;
