export default class APIService {

  /*-------------------------------------------------- ListForm(Organization) -------------------------------------------------------------  */

  static UpdateArticle(body) {
    return fetch('http://localhost:8080/api/orgAdd', {
        'methods': 'PUT',
        headers: {
          'Content-Type': 'applications/json'
        },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json)
  }
  static DeleteArticle(Oid) {
    return fetch(`http://localhost:8080/api/orgDel/${Oid}`, {
      'methods': 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },

    })

  }
  static InsertList(body) {
    return fetch(`http://localhost:8080/api/addOrg`, {

        'method': 'POST',
        body: JSON.stringify(console.log("body" + body)),

        headers: {
          'Content-Type': 'application/json'
        }

      })
      .then(resp => resp.json)

  }


  /*-------------------------------------------------- ListUsers (Users ) -------------------------------------------------------------  */

  static UpdateUser(body) {
    console.log("apiService Update User")
    return fetch('http://localhost:8080/api/userUpdate', {
        'methods': 'PUT',
        headers: {
          'Content-Type': 'applications/json'
        },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json)
  }

  static DeleteUser(Oid) {
    return fetch(`http://localhost:8080/api/userDel/${Oid}`, {
      'methods': 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },

    })

  }
  static InsertUserList(body) {
    return fetch(`http://localhost:8080/api/userAdd`, {

        'method': 'POST',
        body: JSON.stringify(console.log("body" + body)),

        headers: {
          'Content-Type': 'application/json'
        }

      })
      .then(resp => resp.json)

  }

  /*-------------------------------------------------- ListAdmin (Admin) -------------------------------------------------------------  */
  static UpdateAdmin(body) {
    console.log("apiService Update Admin")
    return fetch('http://localhost:8080/api/updateAdmin', {
        'methods': 'PUT',
        headers: {
          'Content-Type': 'applications/json'
        },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json)
  }

  static DeleteAdmin(Oid) {
    return fetch(`http://localhost:8080/api/AdminDel/${Oid}`, {
      'methods': 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },

    })

  }
  static InsertAdminList(body) {
    return fetch(`http://localhost:8080/api/AdminAdd`, {

        'method': 'POST',
        body: JSON.stringify(console.log("body" + body)),

        headers: {
          'Content-Type': 'application/json'
        }

      })
      .then(resp => resp.json)

  }
  /*-------------------------------------------------- ListDistributor (Distributor) -------------------------------------------------------------  */
  static UpdateDist(body) {
    console.log("apiService Update Distributor")
    return fetch('http://localhost:8080/api/DistUpdate', {
        'methods': 'PUT',
        headers: {
          'Content-Type': 'applications/json'
        },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json)
  }

  static DeleteDist(Oid) {
    return fetch(`http://localhost:8080/api/DistDel/${Oid}`, {
      'methods': 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }
  static InsertDistList(body) {
    return fetch(`http://localhost:8080/api/DistAdd`, {

        'method': 'POST',
        body: JSON.stringify(console.log("body" + body)),

        headers: {
          'Content-Type': 'application/json'
        }

      })
      .then(resp => resp.json)

  }
  /*-------------------------------------------------- ListCustomer (Customer) -------------------------------------------------------------  */
  static UpdateCust(body) {
    console.log("apiService Update Customer")
    return fetch('http://localhost:8080/api/CustUpdate', {
        'methods': 'PUT',
        headers: {
          'Content-Type': 'applications/json'
        },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json)
  }
  static DeleteCust(Oid) {
    return fetch(`http://localhost:8080/api/CustDel/${Oid}`, {
      'methods': 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },

    })

  }
  static InsertCustList(body) {
    return fetch(`http://localhost:8080/api/CustAdd`, {

        'method': 'POST',
        body: JSON.stringify(console.log("body" + body)),

        headers: {
          'Content-Type': 'application/json'
        }

      })
      .then(resp => resp.json)

  }






}