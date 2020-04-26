// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern {

    constructor(name, id, email, School) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.school = school;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}