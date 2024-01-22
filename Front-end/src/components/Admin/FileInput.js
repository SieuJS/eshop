import './FileInput.css'
import uploadImg from '../../assets/images/cloud-upload.png'
import React, { useRef, useState } from 'react';

export default function FileInput(props) {

    const wrapperRef = useRef(null);

    const { file, setFile } = props
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
        console.log(newFile);
        if (newFile && (newFile.type === 'image/png' || newFile.type === 'image/jpeg')) {
            // const updateList = [...fileList, newFile];
            setFile(newFile)
        }
    }

    const fileRemove = (file) => {
        // const updateList = [...fileList];
        // updateList.splice(fileList.indexOf(file), 1);
        setFile(null)
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
                file && 
                <div className="file-input-preview">
                    <p className="file-input-preview_title">Ready to upload</p>
                {
                    // fileList.map((item, index) => (     
                        <div className="file-input-preview_item">
                            <div className="preview-item-wrap">
                                <img src={URL.createObjectURL(file)} alt="" style={{'borderRadius': '6px'}} />
                                <div className="file-input-preview_info">
                                    <div>{file.name}</div>
                                </div>
                            </div>
                            <span className="btn btn-danger btn-sm file-input-delete" onClick={() => fileRemove()}>
                                <i className="fa fa-trash"></i>
                            </span>
                        </div>  
                    // ))
                }
                </div>                
            }
        </>
    );
};