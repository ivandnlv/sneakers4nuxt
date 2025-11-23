<script setup lang="ts">

</script>

<template>
  <div />
<!--  <SneakerIdPageLoader v-if="!sneakerData || pending" />-->

<!--  <div v-else-if="sneakerData" class="flex flex-col mt-6">-->
<!--    <div class="flex gap-3 items-center">-->
<!--      <UButton-->
<!--        color="gray"-->
<!--        size="xl"-->
<!--        :icon="HeroIcons.ARROW_SMALL_LEFT"-->
<!--        @click="router.back()"-->
<!--      />-->

<!--      <h1 class="text-3xl font-semibold">-->
<!--        {{ sneakerData.modelName }}-->
<!--      </h1>-->
<!--    </div>-->

<!--    <div class="grid grid-cols-2 gap-8 mt-4 rounded-[20px] p-5">-->
<!--      <client-only>-->
<!--        <SneakerSlider :sneaker="sneakerData" />-->
<!--      </client-only>-->

<!--      <SneakerInfo :sneaker="sneakerData">-->
<!--        <template #feature>-->
<!--          <AddToCartBtn-->
<!--            class="mt-6"-->
<!--            block-->
<!--            :sneaker="sneakerData"-->
<!--            with-title-->
<!--            :with-icon="false"-->
<!--          />-->
<!--        </template>-->
<!--      </SneakerInfo>-->
<!--    </div>-->
<!--  </div>-->
</template>
