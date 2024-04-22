# Go Agrics Backend API :star_struck:

Welcome to the Go Agrics Backend API, the core component of the Go Agrics IdeaThon project focused on agricultural solutions.

## Covered topics

- **Cloudinary Image Storage** 

- **Twilio OTP Authentication**

- **RESTful routing**
  
- **Controllers/Models etc with proper separation of concerns**
  
- **JWT Authentication**
  

## Routes List:

### Register

| Method     | EndPoint         | URI                                                     |
|------------|----------------- |---------------------------------------------------------|
| `POST`     |  `/api/generate` |`https://go-agrics-rythm01.vercel.vercel.app/api/generat`|
| `POST`     | `/api/verify`    | `https://go-agrics.vercel.app/api/verify`               |
| `POST`     | `/api/register`  | `https://go-agrics.vercel.app/api/register`             |

### Labor

| Method     | EndPoint                          | URI                                                     |
|------------|-----------------------------------|---------------------------------------------------------|
| `GET/HEAD` | `/api/labor/{id}`                 | `https://go-agrics.vercel.app/api/labor/{id}`           |
| `GET/HEAD` | `/api/labor`                      | `https://go-agrics.vercel.app/api/labor`                |
| `PUT`      | `/api/labor/register/{id}`        | `https://go-agrics.vercel.app/api/labor/register/{id}`  |
| `PUT`      | `/api/labor/update/{id}`          | `https://go-agrics.vercel.app/api/labor/update/{id}`    |
| `DELETE`   | `/api/labor/delete/{id}`          | `https://go-agrics.vercel.app/api/labor/delete/{id}`    |

### Farmer

| Method     | EndPoint                          | URI                                                        |
|------------|-----------------------------------|------------------------------------------------------------|
| `GET/HEAD` | `/api/farmers`                    | `https://go-agrics.vercel.app/api/farmers`                 |
| `PUT`      | `/api/farmer/register/{id}`       | `https://go-agrics.vercel.app/api/farmer/register/{id}`    |
| `PUT`      | `/api/farmer/update/{id}`         | `https://go-agrics.vercel.app/api/farmer/update/{id}`      |
| `PUT`      | `/api/farmer/{fId}/tool/{tId}`    | `https://go-agrics.vercel.app/api/farmer/{id}/tool/{id}`   |
| `DELETE`   | `/api/farmer/delete/{id}`         | `https://go-agrics.vercel.app/api/farmer/delete/{id}`      |
| `GET/HEAD` | `/api/farmer/{id}`                | `https://go-agrics.vercel.app/api/farmer/{id}`             |
| `DELETE`   | `/api/farmer/{fId}/land/{lId}`    | `https://go-agrics.vercel.app/api/farmer/{id}/land/{id}`   |
| `DELETE`   | `/api/farmer/{fId}/tool/{tId}`    | `https://go-agrics.vercel.app/api/farmer/{id}/tool/{id}`   |
| `PUT`      | `/api/farmer/{fId}/land/{lId}`    | `https://go-agrics.vercel.app/api/farmer/{id}/land/{id}`   |
| `PUT`      | `/api/farmer/{fId}/land/{lId}`    |`https://go-agrics.vercel.app/api/farmer/register/tool/{id}`|

### Dealer

| Method     | EndPoint                                       | URI                                                                 |
|------------|------------------------------------------------|---------------------------------------------------------------------|
| `PUT`      | `/api/dealer/register/{id}`                    | `https://go-agrics.vercel.app/api/dealer/register/{id}`             |
| `GET/HEAD` | `/api/dealer/{id}`                             | `https://go-agrics.vercel.app/api/dealer/{id}`                      |
| `PUT`      | `/api/dealer/update/{id}`                      | `https://go-agrics.vercel.app/api/dealer/update/{id}`               |
| `DELETE`   | `/api/dealer/delete/{id}`                      | `https://go-agrics.vercel.app/api/dealer/delete/{id}`               |
| `PUT`      | `/api/dealer/{dId}/tool/{tId}`                 | `https://go-agrics.vercel.app/api/dealer/{id}/tool/{id}`            |
| `DELETE`   | `/api/dealer/{dId}/tool/{tId}`                 | `https://go-agrics.vercel.app/api/dealer/{id}/tool/{id}`            |
| `GET/HEAD` | `/api/dealers`                                 | `https://go-agrics-rythm01.vercel.app/api/dealers`                  |
| `PUT`      | `/api/dealer/{dId}/farmer/{fId}/land/{lId}`    | `https://go-agrics.vercel.app/api/dealer/{id}/farmer/{id}/land/{id}`|
| `DELETE`   | `/api/dealer/{dId}/farmer/{fId}/land/{lId}`       | `https://go-agrics.vercel.app/api/dealer/{id}/farmer/{id}/land/{id}`|
  
## Screenshots 

<table>
<tr>
<td ><img src="https://github.com/rythm01/GoAgrics/assets/115993280/f8ae9d29-ee7c-408e-9d86-112039342819" width="auto" height="auto" max-width="100%"></td>
<td ><img src="https://github.com/rythm01/GoAgrics/assets/115993280/4ef2c957-0001-4e5e-8b23-5be5ee31540b" width="auto" height="auto" max-width="100%"></td>
</tr>
</table>

<table>
<tr>
<td ><img src="https://github.com/rythm01/GoAgrics/assets/115993280/05b00e91-a506-49b1-8d7c-f97bbccf2b71" width="auto" height="auto" max-width="100%"></td>
<td ><img src="https://github.com/rythm01/GoAgrics/assets/115993280/e627ec28-387b-4673-894a-f43160f1efbb" width="auto" height="auto" max-width="100%"></td>
</tr>
</table>

