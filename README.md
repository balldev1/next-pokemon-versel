api
POST http://localhost:3000/api/auth/register
POST http://localhost:3000/api/auth/login
GET http://localhost:3000/api/auth/logout

layout Page
[//]: # (  <div className="p-5">)

[//]: # (            <div className="container mx-auto  p-5 rounded-md shadow-sm shadow-accent border-accent">)

[//]: # (                CartPage)

[//]: # (            </div>)

[//]: # (   </div>)

[//]: # (loading)
<div className="h-[30rem] flex  flex-col gap-4 items-center justify-center shadow-sm shadow-accent rounded-md">
                        <span className="loading loading-spinner text-warning h-20 w-20"></span>
                        isLoading
</div>

hover:bg-accent/10