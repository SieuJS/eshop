import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BACK_END_SERVER } from "../../keys/BackEndKeys";
import { Button, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, Typography, Fade, Box} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "@mui/material/Modal";

import {useParams} from 'react-router-dom'

import "./Transaction.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Transaction() {
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [trans, setTrans] = useState();
  const [curPage, setCurPage] = useState(1);
  const [searchPattern, setSearchPattern] = useState();
  const [userID, setUserID] = useState();
  const [offset, setOffset] = useState(0);
  const [max ,setMax] = useState(7)


  // error 

  const [openSuccessModal, setOpenSuccessModal] =useState(false)

  const handleClose = () => {
    
    setOpenSuccessModal(false);
    clearError();
  }

// useEffect(() => {
//   if(error) {
//     setOpenSuccessModal(true)
//   }
// },[error])


  useEffect(() => {
    const fetchTrans = async () => {
      let data;

      try {
        data = await sendRequest(
          `${BACK_END_SERVER}/api/admin/trans/get-by-page?${
            searchPattern ? `userID=${searchPattern}&` : ""
          }page=${curPage}` , "GET" ,{
            authorization : `Beearer ${auth.token}`
          }
        );
      } catch (err) {
        
      }
      setTrans(data);

    };
    fetchTrans();

  }, [sendRequest]);
  const onPageChange = async (e, p) => {
   
    let data;
      try {
        data = await sendRequest(
          `${BACK_END_SERVER}/api/admin/trans/get-by-page?${
            searchPattern ? `userID=${searchPattern}&` : ""
          }page=${p}` , "GET" ,{
            authorization : `Beearer ${auth.token}`
          }
        );
      } catch (err) {
        
      }
      setCurPage(p);
      setTrans(data);
    };
  const onSearch =async (e) => {
    e.preventDefault();
    let data;
    
    // setUserID(searchPattern)
    setCurPage(1)
    setOffset(0)
      try {
        data = await sendRequest(
          `${BACK_END_SERVER}/api/admin/trans/get-by-page?${
            searchPattern ? `userID=${searchPattern}&` : ""
          }page=${1}` , "GET" ,{
            authorization : `Beearer ${auth.token}`
          }
        );
      } catch (err) {
        
      }
      setTrans(data);
  }

  const filler = () => {
    let td = [];
    if(trans && trans.data ){
      let dataLength = trans.data.length ;
      while(dataLength < 7){
        td.push(
          <tr key={dataLength} style={{textAlign: 'center'}} className="trans-row">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
            </tr>
        )
        dataLength ++;
      } 
    }
    return td;
  }

  return (
    <div>
    <div className="chart-card overflow-x-scroll">
      {
        error &&
       <Modal
        open = {!!error}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in = {!!error}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Can not query
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
               {error ? error : ""}
            </Typography>
          </Box>
        </Fade>
      </Modal>
  }

<div className=" d-flex justify-content-between ">
        <h2 className="text-center">TRANSACTIONS LIST</h2>
        <form className="trans-search">
          <input
            type="text"
            className="form-control m-0"
            onChange={(e) => setSearchPattern(e.target.value)}
          />
          <Button
            onClick={onSearch}
            variant="contained"
          >
            <SearchIcon />
          </Button>
        </form>
      </div>
      <div className="card-body">
      
      {isLoading && (
            <div className="d-flex justify-content-center w-100">
              <ClipLoader
                loading={isLoading}
                size={200}
                aria-label="Loading Spinner"
                color="#ffff"
              />
              </div>
            )}
        <table className="trans-table">
          <thead>
            <tr className="text-center">
              <th scope="col">ID TRANS</th>
              <th scope="col">ID TRADER</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">ID ORDER</th>
              <th scope="col">STATUS</th>
              <th scope="col">BALANCE</th>
              <th scope="col">DATE</th>
            </tr>
          </thead>
          <tbody className="trans-body">
            {trans &&
              trans.data &&
              trans.data.map((tran, index) => {
                return (
                  <tr key={index} style={{textAlign: 'center'}} className="trans-row">
                    <td>{tran.TransID}</td>
                    <td>{tran.ShopID}</td>
                    <td>{tran.Amount}</td>
                    <td>{tran.OrderID}</td>
                    <td>{tran.Status}</td>
                    <td>{tran.Balance}</td>
                    <td>{new Date(Date.parse(tran.Date)).toUTCString().split('GMT')[0].split(', ')[1]}</td>
                  </tr>
                );
              })}
              {filler()}
          </tbody>
        </table>
       
      </div>
      <div className="">
        <Pagination
          className="pagination text-light"
          count={(trans && trans.totalPage) || 1}
          color="primary"
          onChange={onPageChange}
          page = {curPage}
          disableInitialCallback={true}
        />
      </div>
    </div>
    </div>
  );
}

export default Transaction;
