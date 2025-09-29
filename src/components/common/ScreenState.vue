<template>
  <div
    class="py-5 ma-auto p-absolute top-0 bottom-0 left-0 right-0 width-200 height-200"
  >
    <div class="text-center">
      <div class="shape-11"></div>
      <p
        class="primary-text-2 font-weight-medium fs-14 text-center ls-05 lh-21 pl-4 my-4"
      >
        Redirecting...
      </p>
    </div>
  </div>
</template>

<style>
.shape-11 {
  margin: 0 auto;
  width: 4vmax;
  height: 4vmax;
  border-right: 4px solid #2583fd;
  border-radius: 100%;
  animation: spinRight 800ms linear infinite;
}
.shape-11:before,
.shape-11:after {
  content: "";
  width: 3vmax;
  height: 3vmax;
  display: block;
  position: absolute;
  top: calc(50% - 1.5vmax);
  left: calc(50% - 1.5vmax);
  border-left: 3px solid #2583fd;
  border-radius: 100%;
  animation: spinLeft 800ms linear infinite;
}
.shape-11:after {
  width: 2vmax;
  height: 2vmax;
  top: calc(50% - 1vmax);
  left: calc(50% - 1vmax);
  border: 0;
  border-right: 2px solid #2583fd;
  animation: none;
}
@keyframes spinLeft {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(720deg);
  }
}

@keyframes spinRight {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
