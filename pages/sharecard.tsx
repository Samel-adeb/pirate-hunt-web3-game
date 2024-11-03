import "../app/globals.css";
import BigCoin from "../public/assets/BigCoin.svg";
import Cap from "../public/assets/Cap.png";
import BigBaby from "../public/assets/BigBaby.png";
import html2canvas from "html2canvas";
import { useAppContext } from "@/context";

export default function ShareCard() {
    const { userBalance } = useAppContext();

    const uploadToCloudinary = async (dataURL: string): Promise<string | null> => {
        const cloudName = 'dkksnrgl1'; // Replace with your Cloudinary cloud name
        const uploadPreset = 'ml_default'; // Replace with your Cloudinary upload preset
    
        // Extract the base64 data by removing the "data:image/png;base64," prefix
        const base64Data = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    
        try {
            // Convert base64 data to a Blob
            const binary = atob(base64Data);
            const array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            const blob = new Blob([new Uint8Array(array)], { type: 'image/png' });
    
            // Use FormData to upload the Blob
            const formData = new FormData();
            formData.append("file", blob);
            formData.append("upload_preset", uploadPreset);
    
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
    
            if (data.secure_url) {
                return data.secure_url;
            } else {
                console.error("Error response from Cloudinary:", data.error.message);
                return null;
            }
        } catch (error) {
            console.error("Failed to upload image to Cloudinary:", error);
            return null;
        }
    };
    
    const downloadImageWithExactColors = async () => {
        const element = document.getElementById("share-card");
    
        if (!element) {
            console.error("Element with ID 'share-card' not found.");
            return null;
        }
    
        // Capture the canvas, specifying options to preserve colors and styles
        const canvas = await html2canvas(element, {
            backgroundColor: '#251301E8', // Set the exact background color
            useCORS: true,
            scale: 2,
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
        });
    
        const dataURL = canvas.toDataURL("image/png");
    
        // Trigger download
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "share-card.png";
        link.click();
    
        // Return dataURL for Cloudinary upload
        return dataURL;
    };
    
    const handleShare = async () => {
        await document.fonts.ready;
    
        // Capture and upload the image
        const dataURL = await downloadImageWithExactColors();
        if (!dataURL) return;
    
        const imageUrl = await uploadToCloudinary(dataURL);
        if (imageUrl) {
            // Show a message to the user
            alert(`Image uploaded! You can share it on your Telegram Story using this link: ${imageUrl}`);
            
            // Optionally, you can still open the Telegram share dialog for regular sharing
            const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(imageUrl)}&text=Check out my earnings!`;
            window.open(telegramUrl, "_blank");
        }
    };

    return (
        <div className="h-[calc(100vh + 200px)] bg-[#251301E8]">
            <div id="share-card">
                <div className="pt-10">
                    <div className="flex items-center justify-center gap-[15px]">
                        <img width={71.22} height={71.22} src={Cap.src} alt="Cap" />
                        <h1 className="text-[31.29px] leading-[46.93px] font-semibold tracking-[1.3px] text-white">Pirate Hunt</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center pt-[25px]">
                    <h2 className="text-center text-white text-[20.57px] leading-[30.86px] tracking-[1.29px] font-medium">
                        I have earned
                    </h2>
                    <div className="-mt-[20px] flex items-center justify-center gap-[15px]">
                        <img width={52.67} height={52.67} src={BigCoin.src} alt="BigCoin" />
                        <h1 className="text-[36.87px] leading-[84.27px] font-bold text-white">
                            {userBalance || 0}
                        </h1>
                    </div>
                </div>

                <div className="pt-[25px]">
                    <img width={361.48} height={513} src={BigBaby.src} alt="BigBaby" />
                </div>
            </div>

            <button
                onClick={handleShare}
                className="mt-5 p-2 bg-[#FFC247] font-bold text-white flex flex-col items-center justify-center max-w-[200px] mx-auto rounded"
            >
                Share To Telegram
            </button>
        </div>
    );
}
