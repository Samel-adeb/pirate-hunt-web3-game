import Image from "next/image";
import "../app/globals.css";

import BigCoin from "../public/assets/BigCoin.svg";
import Cap from "../public/assets/Cap.png";
import BigBaby from "../public/assets/BigBaby.png";
import html2canvas from "html2canvas";





export default function ShareCard() {

    const uploadToCloudinary = async (dataURL: any) => {
        const cloudName = 'dkksnrgl1'; // Replace with your cloud name
        const uploadPreset = 'my_preset'; // Replace with your upload preset
    
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: new URLSearchParams({
                file: dataURL,
                upload_preset: uploadPreset,
            }),
        });
    
        const data = await response.json();
        return data.secure_url; // This is the URL of the uploaded image
    };


    const handleShare = async () => {
        const element = document.getElementById("share-card");
    
        // Check if the element is not null
        if (!element) {
            console.error("Element with ID 'share-card' not found.");
            return; // Exit the function if the element doesn't exist
        }
    
        const canvas = await html2canvas(element);
        const dataURL = canvas.toDataURL("image/png");
    
        // Upload the image to Cloudinary
        const imageUrl = await uploadToCloudinary(dataURL);
    
        // Redirect to Telegram share link
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(imageUrl)}&text=Check out my earnings!`;
        window.open(telegramUrl, "_blank");
    };

    

    return (
        <>


        <div className="h-[100vh + 200px] bg-[#251301E8]" >
            <div id="share-card">
                <div className="pt-10">
                    <div className="flex items-center justify-center gap-[15px]">
                        <Image width={71.22} height={71.22} src={Cap} alt="Cap" />
                        <h1 className="text-[31.29px] leading-[46.93px] font-semibold tracking-[1.3px] text-white">Pirate Hunt</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center pt-[25px]">
                    <h2 className="text-center text-white text-[20.57px] leading-[30.86px] tracking-[1.29px] font-medium">I have earned</h2>
                    <div className="-mt-[20px] flex items-center justify-center gap-[15px]">
                        <Image width={52.67} height={52.67} src={BigCoin} alt="BigCoin" />
                        <h1 className="text-[36.87px] leading-[84.27px] font-bold text-white">100,000,000</h1>
                    </div>
                </div>

                <div className="pt-[25px]">
                    <Image width={361.48} height={513} src={BigBaby} alt="BigBaby" />
                </div>
            </div>
            <button onClick={handleShare} className="mt-5 p-2 bg-[#FFC247] font-bold text-white flex flex-col items-center justify-center max-w-[200px] mx-auto rounded">
                Share To Telegram
            </button>
        </div>
        
        
        
        </>
    )
}