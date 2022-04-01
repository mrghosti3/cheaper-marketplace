<template>
  <!-- Product price comparison popup -->
  <div id="popup" class="modal justify-content-center">
    <div id="popup-dialog" class="modal-dialog d-block">
      <div id="popup-content" class="modal-content">
        <!-- Header -->
        <div id="popup-header" class="modal-header">
          <h4 class="modal-title ps-5">Product name</h4>
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
                <!-- <div class="popup-prod-best-price"><span>BEST PRICE!</span></div> -->
                <div class="popup-store-img">
                  <img src="../assets/img/Lidl_logo.png" alt="" />
                </div>
                <div class="popup-prod-name">
                  <span>Exapmle name for a product</span>
                </div>
                <div class="popup-prod-price"><span>3.99 €</span></div>
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
export default {};
</script>