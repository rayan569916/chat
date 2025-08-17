function Chat() {
    const [chats,setChats]= useState([]);

    useEffect(() => {
       hb
    })

    return (
        <div className="container-fluid vh-100">
            <div className="row bg-light" style={{ height: '90%' }}>
                
            </div>
            <div id="chat_type" className="row" style={{ height: '10%' }}>
                <div className="col-10">
                    <input type="text" placeholder="Type your message here..."/>    
                </div>
                <div className="col-2">
                    <button className=""> 
                        ➤
                    </button>
                </div>
            </div>

        </div>
    );
}
export default Chat;