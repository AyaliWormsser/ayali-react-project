import { action, computed, makeAutoObservable, observable, runInAction } from "mobx";
import axios from "axios";
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';

class Bussiness {
    initial = {
        id: '1',
        name: "עולם הספר",
        address: "בני ברק",
        phone: "0533173469",
        owner: "אילי וורמסר",
        logo: "",
        description: "ספרייה עשירה ומבוקרת לעיון ולהשאלה"
    }


    logo = <img
        src="https://zbooks.co.il/wp-content/uploads/2017/05/%D7%94%D7%95%D7%A6%D7%90%D7%95%D7%AA_%D7%9C%D7%90%D7%95%D7%A8_%D7%A1%D7%A4%D7%A8%D7%99%D7%9D.png"
        srcSet="https://zbooks.co.il/wp-content/uploads/2017/05/%D7%94%D7%95%D7%A6%D7%90%D7%95%D7%AA_%D7%9C%D7%90%D7%95%D7%A8_%D7%A1%D7%A4%D7%A8%D7%99%D7%9D.png"
        loading="lazy"
        alt=""
    />

    data = {
        id: '1',
        name: "עולם הספר",
        address: "בני ברק",
        phone: "0533173469",
        owner: "אילי וורמסר",
        logo: "",
        description: "ספרייה עשירה ומבוקרת לעיון ולהשאלה"

    }
    constructor() {
        makeAutoObservable(this, {
            data: observable,
            getBussiness: computed,
            createBussines: action,
            updateBussiness: action
        });
        this.fetchData();
    }

    fetchData() {
        axios.get('http://localhost:8787/businessData').then((res) => {
            runInAction(() => {
                this.data = res.data;
            });
        }).catch(() => {
        })
    }

    fetchDataExist = async () => {
        const bus = this.data;
        await this.fetchData();
        if (this.data == {}) {
            await this.updateBussiness(bus);
            this.data = bus;

        }
    }

    updateBussiness(bussiness) {
        fetch('http://localhost:8787/businessData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bussiness)
        }).then(response => response.json()).then(data => {
            console.log(data);
            this.data = data;

        }).catch(err => {
            console.log(err);
        });
    }
    get getBussiness() {
        if (Object.keys(this.data).length === 0)
            return this.initial;
        return this.data;
    }
}

export default new Bussiness();