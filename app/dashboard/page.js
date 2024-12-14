import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";

// page title
export const metadata = 
{ 
    title: "Practice - Dashboard",
};

export default function DashboardPage() //default function to call when opening a webpage
{
    const isAuthenticated = false
    let children = (
        <Login />
    )

    if(isAuthenticated)
    {
        children = (<Dashboard/>)
    }

    return(
        <Main>
            {children}
        </Main>
    );
}
