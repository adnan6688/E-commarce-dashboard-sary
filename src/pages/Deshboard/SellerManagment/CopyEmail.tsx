import { useState } from "react";
import { Copy } from "react-feather"; 

const CopyEmail = ({ supportEmail }: { supportEmail: string }) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(supportEmail).then(
            () => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000); 
            },
            (err) => {
                console.error("Failed to copy: ", err);
            }
        );
    };

    return (
        <div className="flex  justify-between  w-full">
            <div className="flex-1 overflow-hidden">
                <p className="text-[11px] font-bold text-gray-400  tracking-wider">
                    Email Address
                </p>
                <p className="text-sm font-bold text-gray-700 truncate">
                    {supportEmail}
                </p>
            </div>
            <button
                className="text-gray-300 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={handleCopyClick}
                title="Copy email"
            >
                <Copy size={18} />
            </button>
            {copySuccess && (
                <span className="text-green-500 text-xs ml-2">Copied!</span>
            )}
        </div>
    );
};

export default CopyEmail;
