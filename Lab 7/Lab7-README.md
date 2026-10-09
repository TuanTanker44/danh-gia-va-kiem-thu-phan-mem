# Báo cáo Thực hành Kiểm thử API với Postman

## 1. Mục Tiêu Kiểm Thử
- Sử dụng công cụ Postman để kiểm thử REST API thực tế.
- Kiểm tra khả năng gửi request, nhận response và xử lý các phương thức HTTP phổ biến bao gồm: GET, POST, PUT và DELETE.

## 2. Môi Trường Kiểm Thử
- **Công cụ kiểm thử:** Postman
- **API sử dụng:** ReqRes (`https://reqres.in`)
- **Kiểu API:** REST API
- **Định dạng dữ liệu:** JSON
- **Hệ điều hành:** Windows

## 3. Phương Pháp Kiểm Thử
- Kiểm thử thủ công trên phần mềm Postman.
- Các request được khởi tạo trong Workspace `Lab7-Test-API`.
- Sau khi gửi request, tiến hành kiểm tra Status Code, Response Body và đối chiếu kết quả thực tế với kết quả mong đợi.

---

## 4. Kịch Bản Kiểm Thử Lần 1
- **Tên Kịch Bản:** Kiểm thử lấy danh sách người dùng
- **Mục Đích:** Kiểm tra khả năng lấy danh sách người dùng phân trang của API.
- **Phương Thức HTTP:** GET
- **URL:** `https://reqres.in/api/users?page`
- **Tham Số:** `page=2`
- **Kết Quả Mong Đợi:** API gửi yêu cầu thành công, trả về danh sách người dùng với Status Code 200 OK.
- **Kết Quả Thực Tế:** API trả về danh sách người dùng trang 2 dưới định dạng JSON kèm Status Code 200 OK.
- **Trạng Thái:** Thành công
- **Hình ảnh thực hành:**
![Kiểm thử lần 1](image.png)

---

## 5. Kịch Bản Kiểm Thử Lần 2
- **Tên Kịch Bản:** Kiểm thử lấy thông tin người dùng không tồn tại
- **Mục Đích:** Kiểm tra khả năng xử lý của API khi yêu cầu một tài nguyên không có trên hệ thống.
- **Phương Thức HTTP:** GET
- **URL:** `https://reqres.in/api/users/23010019`
- **Tham Số:** `id=23010019`
- **Kết Quả Mong Đợi:** API trả về phản hồi không tìm thấy dữ liệu kèm Status Code 404 Not Found.
- **Kết Quả Thực Tế:** API phản hồi chính xác Status Code 404 Not Found và Response Body rỗng `{}`.
- **Trạng Thái:** Thành công
- **Hình ảnh thực hành:**
![Kiểm thử lần 2](image-1.png)
---

## 6. Kịch Bản Kiểm Thử Lần 3
- **Tên Kịch Bản:** Kiểm thử tạo người dùng mới
- **Mục Đích:** Kiểm tra khả năng tiếp nhận và khởi tạo bản ghi mới của API bằng phương thức POST.
- **Phương Thức HTTP:** POST
- **URL:** `https://reqres.in/api/users`
- **Tham Số:** Không có
- **Dữ Liệu Gửi Đi (Body):**
  ```json
  {
      "name": "Tuan",
      "job": "developer"
  }
   ```
- **Kết Quả Mong Đợi:** API tiếp nhận request, tạo mới người dùng thành công và trả về Status Code 201 Created.
- **Kết Quả Thực Tế:** API trả về thông tin vừa tạo kèm theo id tự sinh và thời gian createdAt với Status Code 201 Created.
- **Trạng Thái:** Thành công
- **Hình ảnh thực hành:**
![Kiểm thử lần 3](image-3.png)

---

## 7. Kịch Bản Kiểm Thử Lần 4
- **Tên Kịch Bản:** Kiểm thử cập nhật thông tin người dùng
- **Mục Đích:** Kiểm tra khả năng cập nhật toàn bộ thông tin người dùng bằng phương thức PUT.
- **Phương Thức HTTP:** PUT
- **URL:** `https://reqres.in/api/users/:id`
- **Tham Số:** `id=2`
- **Dữ Liệu Gửi Đi (Body):**
  ```json
  {
      "name": "Tuan",
      "job": "leader"
  }
   ```

- **Kết Quả Mong Đợi:** API cập nhật dữ liệu thành công và trả về thông tin sau chỉnh sửa với Status Code 200 OK.
- **Kết Quả Thực Tế:** API trả về dữ liệu cập nhật kèm thời gian updatedAt với Status Code 200 OK.
- **Trạng Thái:** Thành công
- **Hình ảnh thực hành:**
![Kiểm thử lần 4](image-4.png)

---

## 8. Kịch Bản Kiểm Thử Lần 5
- **Tên Kịch Bản:** Kiểm thử xóa người dùng
- **Mục Đích:** Kiểm tra khả năng xử lý yêu cầu xóa tài nguyên bằng phương thức DELETE.
- **Phương Thức HTTP:** DELETE
- **URL:** `https://reqres.in/api/users/:id`
- **Tham Số:** `id=2`
- **Kết Quả Mong Đợi:** API xóa thành công người dùng và phản hồi Status Code 204 No Content.
- **Kết Quả Thực Tế:** API xử lý request xóa thành công và trả về Status Code 204 No Content.
- **Trạng Thái:** Thành công
- **Hình ảnh thực hành:**
![Kiểm thử lần 5](image-5.png)

---

## 9. Kết Quả Kiểm Thử

Tóm tắt kết quả kiểm thử:

- **Số lượng kịch bản đã kiểm thử:** 5
- **Số lần thành công:** 5
- **Số lần thất bại:** 0
- **Tỉ lệ thành công:** 100%

| Kịch bản | Phương thức | Nội dung | Status Code | Trạng thái |
|---|---|---|---|---|
| 1 | GET | Lấy danh sách người dùng | 200 OK | Thành công |
| 2 | GET | Lấy người dùng không tồn tại | 404 Not Found | Thành công |
| 3 | POST | Tạo người dùng mới | 201 Created | Thành công |
| 4 | PUT | Cập nhật thông tin người dùng | 200 OK | Thành công |
| 5 | DELETE | Xóa người dùng | 204 No Content | Thành công |

**Ghi chú:** Kịch bản 2 là test trường hợp lỗi có chủ đích, API trả về 404 đúng như mong đợi nên vẫn tính là thành công.

---

## 10. Kết Luận

Thông qua bài thực hành, em đã sử dụng Postman để kiểm thử REST API ReqRes với bốn phương thức GET, POST, PUT và DELETE, đồng thời kiểm thử cả trường hợp dữ liệu không tồn tại.

Kết quả cho thấy API phản hồi đúng với mục đích của từng kịch bản: 200 OK khi lấy và cập nhật dữ liệu, 201 Created khi tạo mới, 204 No Content khi xóa và 404 Not Found khi yêu cầu tài nguyên không có. Qua đó em hiểu rõ hơn cách gửi request, đọc response và ý nghĩa của các mã trạng thái HTTP.

---

## 11. Tài Liệu Tham Khảo

- Video hướng dẫn Postman: https://www.youtube.com/watch?v=MFxk5BZulVU 