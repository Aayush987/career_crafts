import Provider from "./Provider";



const UserPageLayout = ({children}) => {
    return (
        <div>
            <Provider>
                {children}
            </Provider>
        </div>
    )
}

export default UserPageLayout;