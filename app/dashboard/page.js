import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/context/AuthContext";

// page title
export const metadata = 
{ 
    title: "Practice - Dashboard",
};

export default function DashboardPage() //default function to call when opening a webpage
{
    return(
        <Main>
            <Dashboard />
        </Main>
    );
}
