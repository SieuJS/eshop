export default function Password() {
    return (
        <>
            <div className="info-title mb-4">
                <h3>Change password</h3>
            </div>
            <div className="info-content">
                <div class="container">
                    <div class="row">
                        <div class="col-4 text-end">
                            <p>Old password:</p>
                        </div>
                        <div class="col-8">
                            <input type="text" style={{ width: "200px" }}></input>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-4 text-end">
                            <p>New password:</p>
                        </div>
                        <div class="col-8">
                            <input type="text" style={{ width: "200px" }}></input>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-4 text-end">
                            <p>Rewrite new password:</p>
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
                            <button className="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}