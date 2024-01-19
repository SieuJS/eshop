import './FileInput.css'
import uploadImg from '../../assets/images/cloud-upload.png'
import React, { useRef, useState } from 'react';

export default function FileInput(props) {

    const wrapperRef = useRef(null);

    const { fileList, setFileList } = props
    const onDragEnter = () => {
        wrapperRef.current.classList.add('dragover')
    }

    const onDragLeave = () => {
        wrapperRef.current.classList.remove('dragover')
    }

    const onDrop = () => {
        wrapperRef.current.classList.remove('dragover')
    }

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updateList = [...fileList, newFile];
            setFileList(updateList)
        }
    }

    const fileRemove = (file) => {
        const updateList = [...fileList];
        updateList.splice(fileList.indexOf(file), 1);
        setFileList(updateList)
    }

    return (
        <>    
            <div
                ref={wrapperRef}
                className="box-fileinput"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop = {onDrop}
            >
                <div className="file-input-label">
                    <img src={uploadImg} alt="" className = "file-input-label_image"/>
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" name="productImage" id="productImage" onChange={onFileDrop}></input>
            </div>
            {
                fileList.length > 0 && 
                <div className="file-input-preview">
                    <p className="file-input-preview_title">Ready to upload</p>
                {
                    fileList.map((item, index) => (    
                        <div className="file-input-preview_item" key={index}>
                            <div className="preview-item-wrap">
                                <img src={URL.createObjectURL(item)} alt=""/>
                                <div className="file-input-preview_info">
                                    <div>{item.name}</div>
                                </div>
                            </div>
                            <span className="btn btn-danger btn-sm file-input-delete" onClick={() => fileRemove(item)}>
                                <i className="fa fa-trash"></i>
                            </span>
                        </div>
                    ))
                }
                </div>                
            }
        </>
    );
};