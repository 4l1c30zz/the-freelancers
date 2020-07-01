<template>
  <div>
    <nav>
            <a href="/">Strapi Blog </a>
           <router-link
             to="/home" v-slot="{ isActive, href, route, navigate }"
             class="word"
             >
             lalal home link
              <a
               :class="[isActive ? ' router-link-active' : '']"
               :href="href"
                @click="navigate">{{ route.name }}</a>
            </router-link>

    </nav>
  </div>
</template>

