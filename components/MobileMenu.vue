<template>
    <div class="sticky left-0 right-0 top-0 bottom-0 bg-white min-[822px]:hidden flex flex-col items-center min-h-dvh max-h-dvh">
    
        <Header></Header>
           <Nav :isMobile="true"></Nav>
           <div class="flex flex-col items-stretch w-full gap-4 px-4 py-4 absolute bottom-6 left-0 right-0"> 
            <Button :color="'bg-yellow'">Регистрация</Button>
            <Button :color="'bg-button-grey'" text="text-white" :hover="'bg-dark-grey'">Войти</Button>
           </div>
    </div>
</template>