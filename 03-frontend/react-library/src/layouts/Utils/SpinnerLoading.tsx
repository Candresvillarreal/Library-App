export const SpinnerLoading = () => {
    return(
      <div className="container m-5 d-flex justify-content-center"
            style={{ height: 500}}>
                <div className="spinner-border text-rpimary" role="status">
                    <span className="visually-hidden">
                        Loading....
                    </span>
                </div>
            </div>  
    );
}