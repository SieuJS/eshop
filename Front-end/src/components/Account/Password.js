export default function Password() {
    return (
        <>
            <div className="info-title mb-4">
                <h3>Thay đổi mật khẩu</h3>
            </div>
            <div className="info-content">
                <div class="container">
                    <div class="row">
                        <div class="col-4 text-end">
                            <p>Mật khẩu cũ:</p>
                        </div>
                        <div class="col-8">
                            <input type="text" style={{ width: "200px" }}></input>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-4 text-end">
                            <p>Mật khẩu mới:</p>
                        </div>
                        <div class="col-8">
                            <input type="text" style={{ width: "200px" }}></input>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-4 text-end">
                            <p>Nhập lại mật khẩu mới:</p>
                        </div>
                        <div class="col-8">
                            <input type="text" style={{ width: "200px" }}></input>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-4 text-end">
                        </div>
                        <div class="col-8">
                            <button className="btn btn-success">Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}