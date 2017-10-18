
#### method POST
url = http://localhost:3000/quizzes
Header =
Content-Type:application/x-www-form-urlencoded

Body =
name:Bài trắc nghiệm số 1
pass_mark:50
question_groups[0].[title]:Hãy chọn câu trả lời đúng nhất
question_groups[0].[questions][0].[title]:Khoảng cách từ trái đất đến mặt trời là bao nhiêu?
question_groups[0].[questions][0].[mark]:25
question_groups[0].[questions][0].[answers][0].[correct]:true
question_groups[0].[questions][0].[answers][0].[answer]:1000 năm ánh sáng
question_groups[0].[questions][0].[answers][1].[correct]:false
question_groups[0].[questions][0].[answers][1].[answer]:1000 km

---

#### method PUT
Using for update. -> get object by id, append more or edit current -> put

url = http://localhost:3000/quizzes/59e6f1fa692223361092b7f0
Header =
Content-Type:application/x-www-form-urlencoded

Body =
quizId:59e6f1fa692223361092b7f0
question_groups[0].[title]:Hãy chọn câu trả lời đúng nhất
question_groups[0].[questions][0].[title]:Khoảng cách từ trái đất đến mặt trời là bao nhiêu?
question_groups[0].[questions][0].[mark]:25
question_groups[0].[questions][0].[answers][0].[correct]:true
question_groups[0].[questions][0].[answers][0].[answer]:1000 năm ánh sáng
question_groups[0].[questions][0].[answers][1].[correct]:false
question_groups[0].[questions][0].[answers][1].[answer]:1000 km
question_groups[1].[title]:Hãy chọn các câu trả lời đúng.
question_groups[1].[questions][0].[title]:Các loài sau đây, loài nào là gia cầm?
question_groups[1].[questions][0].[mark]:25
question_groups[1].[questions][0].[answers][0].[correct]:true
question_groups[1].[questions][0].[answers][0].[answer]:gà
question_groups[1].[questions][0].[answers][1].[correct]:false
question_groups[1].[questions][0].[answers][1].[answer]:chó
question_groups[1].[questions][0].[answers][2].[correct]:true
question_groups[1].[questions][0].[answers][2].[answer]:vịt
question_groups[1].[questions][0].[answers][3].[correct]:false
question_groups[1].[questions][0].[answers][3].[answer]:thỏ

---
### method GET
url = http://localhost:3000/quizzes
