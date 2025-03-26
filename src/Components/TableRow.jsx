import React from 'react'

const TableRow = (props) => {
    const [img,setImg] = React.useState('');
    function getImg(){
        if(props.Rank === 1){
            setImg('https://i.imgur.com/22OYfAl.png');
        }
        else if(props.Rank === 2){
            setImg('https://i.imgur.com/LhDq6a3.png');
        }
        else if(props.Rank === 3){
            setImg('https://i.imgur.com/Sfudx17.png');
        }
        else{
            setImg('');
        }
    }
    React.useEffect(()=>{
        getImg();
    },[])
  return (
    <div id={props.Rank} className="flex text-[1rem] font-prosto-one font-semibold h-10 border-t">
    <div className="w-[20%] border-r flex items-center justify-center"> 
    {img? <img src={img} alt="rank" className="w-[1.5rem] h-[1.5rem]"/> : props.Rank}
    </div>
    <div className="w-[60%] border-r flex items-center justify-center">{props.Name}</div>
    <div className="w-[20%] flex items-center justify-center">{props.Score}</div>
  </div>
  )
}

export default TableRow
