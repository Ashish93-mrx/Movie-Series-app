import { Pagination } from "@mui/material";



const Custompagination = ({setPage, numOfPages=10}) => {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    };

  return (
    <div 
    style={{
        width:"100%",
        display: "flex",
        justifyContent: "center",
        marginTop:10,
        backgroundColor:"white",
        borderRadius:"10px"
    }} 
    >
      <Pagination 
      count={numOfPages} variant="outlined" shape="rounded" 
      onChange={(e)=> handlePageChange(e.target.textContent)}
      hideNextButton
      hidePrevButton
      color="primary"
      />
    </div>
  )
}

export default Custompagination;
