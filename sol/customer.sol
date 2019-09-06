pragma solidity >=0.4.22 < 0.6.0;

contract customer{
    
    string public id = "customer id";
    string public na = "customer name";
    uint256 age = 1004;
    
    constructor(string memory _id, string memory _na, uint256 _age) public {
        id = _id;
        na = _na;
        age = _age;
    }
    
    function setIdString(string memory _id) public{
        id = _id;
        emit E_setIdString(id);  //추가
    }
    
    event E_setIdString(string id); //추가
    
    function getIdString() public view returns(string memory){
        return id;
    } 


    function setNameString(string memory _na) public{
        na = _na;
        emit E_setNameString(na);  //추가
    }
    
    event E_setNameString(string val1); //추가
    
    
    function getNameString() public view returns(string memory){
        return na;
    } 
    
    
    function setAgeString(uint256 _age) public{
        age = _age;
        emit E_setAgeString(age);  //추가
    }
    
    event E_setAgeString(uint256 age); //추가
    
    function getAgeString() public view returns(uint256){
        return age;
    } 
    
    function setJoinString(string memory _id, string memory _na, uint256 _age) public{
        id = _id;
        na = _na;
        age = _age;
    }
}