<template>
  <!-- Product price comparison popup -->
  <div id="popup" class="modal justify-content-center">
    <div id="popup-dialog" class="modal-dialog d-block">
      <div id="popup-content" class="modal-content">
        <!-- Header -->
        <div id="popup-header" class="modal-header">
          <h4 class="modal-title ps-5">Lavaza</h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <!-- Body -->
        <div id="popup-body" class="modal-body">
          <div class="row">
            <div class="col-md-12 d-flex justify-content-start mt-5 mb-2 ms-5">
              <h5>This product is available in:</h5>
            </div>
          </div>
          <div class="row justify-content-center mb-5 mt-5 ms-5 me-5">
            <div class="col-md d-block mb-4">
              <div class="card best-price pb-3">
                <div class="popup-store-img">
                  <img src="../assets/img/Lidl_logo.png" alt="" />
                </div>
                <div class="popup-prod-name">
                  <span>Lavaza 500g</span>
                </div>
                <div class="popup-prod-price"><span>5.59€</span></div>
                <div class="popup-store-btn">
                  <button href="#">GO TO STORE</button>
                </div>
              </div>
            </div>
            <div class="col-md d-block mb-4">
              <div class="card pb-3">
                <div class="popup-store-img">
                  <img src="https://iki.lt/wp-content/themes/iki_design/assets/svg/iki-logo-u.svg" alt="" />
                </div>
                <div class="popup-prod-name">
                  <span>Lavaza 500g</span>
                </div>
                <div class="popup-prod-price"><span>5.99€</span></div>
                <div class="popup-store-btn">
                  <button href="#">GO TO STORE</button>
                </div>
              </div>
            </div>
            <div class="col-md d-block mb-4">
              <div class="card pb-3">
                <div class="popup-store-img">
                  <img src="https://www.norfa.lt/assets/Uploads/Images/Norfa_Logo-v2.svg2x.png" alt="" />
                </div>
                <div class="popup-prod-name">
                  <span>Lavaza 500g</span>
                </div>
                <div class="popup-prod-price"><span>6.49€</span></div>
                <div class="popup-store-btn">
                  <button href="#">GO TO STORE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prodName', 'prodOldPrice', 'prodPrice', 'priceDate'],
};
</script>