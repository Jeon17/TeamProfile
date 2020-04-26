// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer {

    constructor(name, id, email, GitHub) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.GitHub = GitHub;
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

    getGitHub() {
        return this.GitHub;
    }

    getRole() {
        return "Engineer";
    }
}