import React, { useState } from 'react';
import { Card, CardMedia, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

type MediaPreviewProps = {
    file: File | null;
    onPreviewClose: () => void;
};

function MediaPreview({ file, onPreviewClose }: MediaPreviewProps) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(true);

    const handleClose = () => {
        setIsPreviewOpen(false);
        onPreviewClose();
    };

    const renderPreview = () => {
        if (file == null) {
            return null;
        } else if (file.type.includes('image')) {
            return (
                <Card sx={{ position: 'relative', maxWidth: 600 }}>
                    <CardMedia component="img" src={URL.createObjectURL(file)} alt="Preview" />
                    <IconButton className="clear-button" onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                        <ClearIcon />
                    </IconButton>
                </Card>
            );
        } else if (file.type.includes('video')) {
            return (
                <Card sx={{ position: 'relative', maxWidth: 600 }}>
                    <CardMedia component="video" controls src={URL.createObjectURL(file)} />
                    <IconButton className="clear-button" onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                        <ClearIcon color="secondary" />
                    </IconButton>
                </Card>
            );
        }
        return null;
    };

    return (
        <div>
            {isPreviewOpen && (
                <div className="media-preview-container">
                    <div className="media-preview">
                        {renderPreview()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaPreview;
