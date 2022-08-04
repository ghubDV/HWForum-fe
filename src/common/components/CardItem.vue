<template>
  <div class="card__item">
    <div class="card__icon avatar avatar--large">
      <slot name="icon"></slot>
    </div>
    <div class="card__body">
      <div class="card__body-title">
        <slot name="title"></slot>
      </div>
      <div class="card__body-info">
        <slot name="info"></slot>
      </div>
    </div>
    <slot name="extra"></slot>
  </div>
</template>

<script>
export default {

}

</script>