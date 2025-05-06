export default function LogInForm() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#E5E5CB',marginTop: 0}}>
        <h1 className="text-4xl font-bold mb-6" style={{ color: '#1A120B' }}>LogIn</h1>
        <div className="w- max-w-md rounded-lg shadow-md p-6  "  style={{ backgroundColor: '#D5CEA3' }}>
            <h2 className="text-lg mb-4 text-center" style={{ color: '#3C2A21' }}>
                Enter your details below to log into account.
            </h2>
            <form className="space-y-4 p-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                            borderColor: '#3C2A21',
                            color: '#1A120B',
                            backgroundColor: '#D5CEA3',
                            // focus: { ringColor: '#3C2A21' }
                        }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                            borderColor: '#3C2A21',
                            color: '#1A120B',
                            backgroundColor: '#D5CEA3',
                            // focus: { ringColor: '#3C2A21' }
                        }}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg border-2 border-[#3C2A21] text-[#3C2A21] bg-transparent hover:bg-[#3C2A21] hover:text-[#E5E5CB] transition duration-200 cursor-pointer"
                    >
                        LogIn
                    </button>
                    <a href="/auth/register" className="text-sm " style={{ color: '#3C2A21' }}>
                        Don't have an account?   
                        <span className="hover:underline hover:cursor-pointer"> Register here.</span>
                     </a>
            </form>
           

        </div>    
            
        </div>
    );


}