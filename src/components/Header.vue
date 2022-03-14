<script setup></script>

<template>
    <header>
        <div class="navbar-fixed">
            <ul id="dropdown1" class="dropdown-content">
                <li><a href="#!">Information</a></li>
                <li><a href="#!">Recipes</a></li>
                <li><a href="#!">Calendar</a></li>
                <li class="divider"></li>
                <li><a href="#!">Logout</a></li>
            </ul>
            <nav>
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo">Polycooker</a>
                    <a
                        href="#"
                        data-target="mobile-demo"
                        class="sidenav-trigger"
                        ><em class="material-icons">menu</em></a
                    >
                    <ul class="right hide-on-med-and-down">
                        <li><a href="#!">My recipes</a></li>
                        <li><a href="#!!">My calendar</a></li>
                        <li><a href="#!!!">My account</a></li>
                    </ul>
                </div>
            </nav>

            <ul class="sidenav" id="mobile-demo">
                <li><a href="#?">My recipes</a></li>
                <li><a href="#??">My calendar</a></li>
                <li><a href="#???">My account</a></li>
            </ul>
        </div>
    </header>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
    background-color: #019dde;
    padding-left: 10px;
}
</style>
