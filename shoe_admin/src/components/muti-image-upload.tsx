import React, { ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MultiImageUploadProps {
    pictures: File[];
    setPictures: React.Dispatch<React.SetStateAction<File[]>>;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({ pictures, setPictures }) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            setPictures(prevFiles => [...prevFiles, ...files]);
        }
    };

    const handleRemoveFile = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.preventDefault();
        setPictures(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Upload Multiple Images</label>
            <Input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            <div className="mt-4 max-h-24 overflow-auto">
                {pictures.map((file, index) => (
                    <div key={index} className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <Button variant="ghost" size="sm" onClick={(event) => handleRemoveFile(event, index)}>
                            Xóa
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiImageUpload;
