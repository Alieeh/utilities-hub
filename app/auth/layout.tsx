const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full flex items-center justify-center
        bg-[radial-gradient(ellipse_at_top_left,_#f5f3ff,_#e0e7ff)]">
            {children}
        </div>
    );
}

export default AuthLayout;