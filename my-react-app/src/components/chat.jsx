function Chat() {
    const [chats,setChats]= useState([]);

    useEffect(() => {
       
    })

    return (
            <div className="terminal">
      <div className="terminal-header">
        <span className="led led-red" />
        <span className="led led-yellow" />
        <span className="led led-green" />
        <span className="title">/chat/terminal</span>
      </div>

      <div className="terminal-body" ref={scrollRef}>
        {/* {messages.map((m, i) => ( */}
          <div key={i} className="line">
            {/* <span className="prompt">
              {m.role === "user" ? ">" : m.role === "bot" ? "$" : "~"}
            </span>{" "}
            <span className="msg">{m.text}</span> */}
          </div>
        {/* ))} */}
      </div>

      <div className="terminal-input">
        <span className="prompt">{" > "}</span>
        <textarea
          rows={1}
        //   value={input}
        //   onChange={(e) => setInput(e.target.value)}
        //   onKeyDown={onKeyDown}
          placeholder="type here and press Enter… (Shift+Enter for newline)"
        />
      </div>
    </div>
    );
}
export default Chat;