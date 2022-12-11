import { useEffect, useState } from "react";


const UserCreate = () => {

    const [sectors, setSectors] = useState([]);
    const [sector1, setSector1] = useState([]);
    const [sector2, setSector2] = useState([]);
    const [sector3, setSector3] = useState([]);
    const [selectedSector1, setSelectedSector1] = useState({});
    const [selectedSector2, setSelectedSector2] = useState({});
    const [selectedSector3, setSelectedSector3] = useState({});
    const [selectedSector4, setSelectedSector4] = useState({});
    const [name, namechange] = useState("");
    const [active, activechange] = useState(false);
    const [validation, valchange] = useState(false);




    useEffect(() => {
        fetch("sectors").then((res) => {
            return res.json();
        }).then((resp) => {
            setSectors(resp);
        }).catch((err) => {
            console.log(err.message);
        });
        fetch("userget").then((res) => {
            return res.json();
        }).then((resp) => {
            if(resp.isSaved){
                namechange(resp.name);
                activechange(resp.isAgreeToTerms);
                if(resp.selectedSectors.length>0){
                    setSelectedSector1(resp.selectedSectors[0]);
                    for (let i = 1; i < resp.selectedSectors.length; i++) {
                        if(i===1){
                            setSelectedSector2(resp.selectedSectors[i]);
                        }else if(i===2){
                            setSelectedSector3(resp.selectedSectors[i]);
                        }else if(i===3){
                            setSelectedSector4(resp.selectedSectors[i]);
                        }
                    }
                }
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }, []);


    const sectorOnchage1 = (e) => {
        e.preventDefault();
        if (e.target.value === '0') {

            setSector1([]);
        } else {
            setSelectedSector1(sectors.filter(obj => obj._id === e.target.value)[0]);
            fetch("subsectors/" + e.target.value).then((res) => {
                return res.json();
            }).then((resp) => {
                setSector1(resp);

            }).catch((err) => {
                console.log(err.message);
            })
        }

    }

    const sectorOnchage2 = (e) => {
        e.preventDefault();
        setSelectedSector2(sector1.filter(obj => obj._id === e.target.value)[0]);
        fetch("subsectors/" + e.target.value).then((res) => {
            return res.json();
        }).then((resp) => {
            setSector2(resp);    
        }).catch((err) => {
            console.log(err.message);
        })
    }

    const sectorOnchage3 = (e) => {
        e.preventDefault();
        setSelectedSector3(sector2.filter(obj => obj._id === e.target.value)[0]);
        fetch("subsectors/" + e.target.value).then((res) => {
            return res.json();
        }).then((resp) => {
            setSector3(resp);  
        }).catch((err) => {
            console.log(err.message);
        })
    }

    const sectorOnchage4 = (e) => {
        e.preventDefault();
        setSelectedSector4(sector3.filter(obj => obj._id === e.target.value)[0]);

    }

    const onSubmit = (e) => {
        e.preventDefault();
        var selectedSectorsArr=[];
        selectedSector1._id && selectedSectorsArr.push(selectedSector1);
        selectedSector2._id && selectedSectorsArr.push(selectedSector2);
        selectedSector3._id && selectedSectorsArr.push(selectedSector3);
        selectedSector4._id && selectedSectorsArr.push(selectedSector4);
        fetch("save/" , {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                isAgreeToTerms: active,
                isSaved: true,
                selectedSectors: selectedSectorsArr
            })
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            setSector1(resp);

        }).catch((err) => {
            console.log(err.message);
        })
    }

    const reset =(e) =>{
        e.preventDefault();
        fetch("save/" , {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "fd",
                isAgreeToTerms: false,
                isSaved: false,
                selectedSectors: []
            })
        }).then((res) => {
            return res.json();
        }).then((resp) => {
            setSector1(resp);

        }).catch((err) => {
            console.log(err.message);
        });
        namechange("");
        activechange(false);
        setSelectedSector1({});
        setSelectedSector2({});
        setSelectedSector3({});
        setSelectedSector4({});

    }

    return (
        <div>
            <h1 className="m-4">Please enter your name and pick the Sectors you are currently involved in</h1>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={onSubmit}>

                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onMouseDown={e => valchange(true)} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                            {name.length === 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Sectors:</label>
                                            <select className="form-select" aria-label="Default select example" onChange={sectorOnchage1}>
                                                <option value={0}>select your sector</option>
                                                {
                                                    sectors.length > 0 && sectors.map((item) => {
                                                        return (
                                                            <option key={item._id} value={item._id}>
                                                                {item.sector}
                                                            </option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    {sector1.length > 0 ?
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label></label>
                                                <select className="form-select" aria-label="Default select example" onChange={sectorOnchage2}>
                                                    {
                                                        sector1.length > 0 && sector1.map((item) => {
                                                            return (
                                                                <option key={item._id} value={item._id}>
                                                                    {item.subSector}
                                                                </option>
                                                            );
                                                        })
                                                    }
                                                </select></div>
                                        </div> : <></>
                                    }
                                    {sector2.length > 0 ?
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label></label>
                                                <select className="form-select" aria-label="Default select example" onChange={sectorOnchage3}>
                                                    {
                                                        sector2.length > 0 && sector2.map((item) => {
                                                            return (
                                                                <option key={item._id} value={item._id}>
                                                                    {item.subSector}
                                                                </option>
                                                            );
                                                        })
                                                    }
                                                </select></div>
                                        </div> : <></>
                                    }
                                    {sector3.length > 0 ?
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label></label>
                                                <select className="form-select" aria-label="Default select example" onChange={sectorOnchage4} >
                                                    {
                                                        sector3.length > 0 && sector3.map((item) => {
                                                            return (
                                                                <option key={item._id} value={item._id}>
                                                                    {item.subSector}
                                                                </option>
                                                            );
                                                        })
                                                    }
                                                </select></div>
                                        </div> : <></>
                                    }
                                    <div className="col-lg-12 mt-4 mb-2">
                                        <div className="form-check">
                                            <label className="form-check-label">{selectedSector1.sector}{selectedSector2.subSector  ? ' --> ' : ''}{selectedSector2.subSector}{selectedSector3.subSector  ? ' --> ' : ''}{selectedSector3.subSector}{selectedSector4.subSector  ? ' --> ' : ''}{selectedSector4.subSector}</label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mt-4 mb-2">
                                        <div className="form-check">
                                            <input checked={active} onChange={e => activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                            <label className="form-check-label">Agree to terms</label>

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <button className="btn btn-danger" onClick={reset}>reset</button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default UserCreate;