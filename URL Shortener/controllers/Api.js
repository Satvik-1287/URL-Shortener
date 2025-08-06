export async function fetchData(req, res) {
    res.send(names);
};

export async function fetchSingleData(req, res) {
    const id = Number(req.params.id);
    const name = names.find((obj) => obj.id === id);
    if(!name){
        return res.send("No Data found!")
    }
    else{
        res.send(name);
    } 
}; 

export async function addData(req, res) {
    const newData = req.body;
    //console.log(newData);
    names.push(newData);
    res.send(names);
};

export async function updateData(req, res) {
    const { id } = req.params;
    const dataToUpdate = req.body;
    
    const updatedData = names.map(obj => obj.id === Number(id) ? {...obj, ...dataToUpdate} : obj);
    res.send(updatedData);
};

export async function deleteData(req, res) {
    const idToDelete = Number(req.params.id);
    const updatedData = names.filter(obj => obj.id !== idToDelete);
    res.send(updatedData); 
};