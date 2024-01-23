

export default function AdminStatistic(props) {

  return (
      <>      
      <div class="main-cards">

          <div class="card ">
              <div class="card-inner">
                  <h3>PRODUCTS</h3>
                  <span class="material-icons-outlined">inventory_2</span>
              </div>
              <h1>{props.data && props.data.prodStat || 0}</h1>
          </div>

          <div class="card ">
              <div class="card-inner">
                  <h3>CATEGORIES</h3>
                  <span class="material-icons-outlined">category</span>
              </div>
              <h1>{ props.data && props.data.catStat || 0}</h1>
          </div>

          <div class="card ">
              <div class="card-inner">
                  <h3>CUSTOMERS</h3>
                  <span class="material-icons-outlined">groups</span>
              </div>
              <h1>{props.data &&props.data.accStat || 0}</h1>
          </div>

          <div class="card ">
              <div class="card-inner">
                  <h3>ALERTS</h3>
                  <span class="material-icons-outlined">notification_important</span>
              </div>
              <h1>{props.data &&props.data.orderStat || 0}</h1>
          </div>

      </div>
      </>
  );
};