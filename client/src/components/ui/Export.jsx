import React from "react";
import { MdOutlineDownloadForOffline } from "react-icons/md";

export const Export = ({ onExport }) => (
         <button
           className="px-4 py-2 flex justify-between items-center gap-3 rounded-lg"
           onClick={() => onExport()}
         >
         <MdOutlineDownloadForOffline size={20}/>
           Export
         </button>
       );
