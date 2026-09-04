# Trang Đăng nhập – Test Cases

## 1. Mô tả chức năng
- **Username**: bắt buộc nhập, độ dài hợp lệ từ **6 đến 20 ký tự**.
- **Password**: bắt buộc nhập, độ dài hợp lệ từ **6 đến 25 ký tự**.
- **Nút Login**: submit form đăng nhập.
- **Khóa tài khoản**: nếu đăng nhập sai (đúng định dạng nhưng sai tài khoản/mật khẩu) **quá 5 lần liên tiếp**, hệ thống:
  - Khóa tài khoản trong **15 phút**.
  - Hiển thị hint: *"Tài khoản đã bị khóa do đăng nhập thất bại quá 5 lần. Bạn vui lòng đăng nhập lại sau 15 phút."*
  - Lưu mốc thời gian mở khóa (`lockUntil`) vào `localStorage`.
  - Tự động mở khóa khi hết 15 phút (không cần tải lại trang).
- Danh sách tài khoản hợp lệ được load từ **mock data `users.json`** (không hardcode trong `script.js`). Tài khoản dùng để test đăng nhập đúng: `tuantester` / `password123` (xem đầy đủ trong `users.json`).

## 2. Danh sách kịch bản kiểm thử (Test Cases)

### A. Kiểm thử trường Username (Boundary Value Analysis)
| STT | Kịch bản | Input | Kết quả mong đợi |
|---|---|---|---|
| TC-01 | Username rỗng | `""` | Hiển thị lỗi "Vui lòng nhập tài khoản." |
| TC-02 | Username 1 ký tự (dưới min) | `"a"` (1 ký tự) | Hiển thị lỗi độ dài 6-20 |
| TC-03 | Username 5 ký tự (biên dưới - 1) | 5 ký tự | Hiển thị lỗi độ dài 6-20 |
| TC-04 | Username 6 ký tự (biên dưới hợp lệ) | 6 ký tự | Không lỗi định dạng, cho phép submit |
| TC-05 | Username 7 ký tự | 7 ký tự | Không lỗi định dạng |
| TC-06 | Username 20 ký tự (biên trên hợp lệ) | 20 ký tự | Không lỗi định dạng |
| TC-07 | Username 21 ký tự (biên trên + 1) | 21 ký tự | Hiển thị lỗi độ dài 6-20 |
| TC-08 | Username rất dài (vượt xa max) | 100 ký tự | Hiển thị lỗi độ dài 6-20 |
| TC-09 | Username chứa khoảng trắng đầu/cuối | `"  abcdef  "` | Xác nhận cách hệ thống xử lý (trim hay không) |
| TC-10 | Username chứa ký tự đặc biệt/unicode | `"user@#!ệ"` | Kiểm tra hệ thống chấp nhận/từ chối theo đúng yêu cầu (hiện tại không giới hạn ký tự, chỉ giới hạn độ dài) |

### B. Kiểm thử trường Password (Boundary Value Analysis)
| STT | Kịch bản | Input | Kết quả mong đợi |
|---|---|---|---|
| TC-11 | Password rỗng | `""` | Hiển thị lỗi "Vui lòng nhập mật khẩu." |
| TC-12 | Password 1 ký tự (dưới min) | 1 ký tự | Hiển thị lỗi độ dài 6-25 |
| TC-13 | Password 5 ký tự (biên dưới - 1) | 5 ký tự | Hiển thị lỗi độ dài 6-25 |
| TC-14 | Password 6 ký tự (biên dưới hợp lệ) | 6 ký tự | Không lỗi định dạng |
| TC-15 | Password 25 ký tự (biên trên hợp lệ) | 25 ký tự | Không lỗi định dạng |
| TC-16 | Password 26 ký tự (biên trên + 1) | 26 ký tự | Hiển thị lỗi độ dài 6-25 |
| TC-17 | Password rất dài (vượt xa max) | 100 ký tự | Hiển thị lỗi độ dài 6-25 |
| TC-18 | Password che ký tự (masked) | bất kỳ | Input hiển thị dạng `•••` (type="password") |

### C. Kiểm thử chức năng đăng nhập (Login Logic)
| STT | Kịch bản | Điều kiện | Kết quả mong đợi |
|---|---|---|---|
| TC-19 | Đăng nhập đúng tài khoản/mật khẩu | username & password đúng, đúng định dạng | Hiển thị thông báo "Đăng nhập thành công!"; reset `failedAttempts` |
| TC-20 | Đăng nhập sai tài khoản, đúng định dạng | username sai, password bất kỳ hợp lệ | Hiển thị lỗi "Sai tài khoản hoặc mật khẩu...", tăng biến đếm thất bại lên 1 |
| TC-21 | Đăng nhập sai mật khẩu, đúng định dạng | username đúng, password sai | Tương tự TC-20 |
| TC-22 | Cả username và password đều sai | | Tương tự TC-20 |
| TC-23 | Bỏ trống cả 2 trường rồi bấm Login | | Hiển thị đồng thời lỗi username & password, không tính là 1 lần đăng nhập thất bại (do sai định dạng, không gọi tới kiểm tra credentials) |
| TC-24 | Username/password sai định dạng (VD quá ngắn) rồi bấm Login | | Chỉ hiển thị lỗi định dạng, KHÔNG tăng biến đếm thất bại |
| TC-25 | Nhập lại sau khi báo lỗi (gõ lại vào input) | | Thông báo lỗi của trường đó được xóa ngay khi người dùng gõ |

### D. Kiểm thử khóa tài khoản sau 5 lần thất bại (Account Lockout)
| STT | Kịch bản | Điều kiện | Kết quả mong đợi |
|---|---|---|---|
| TC-26 | Đăng nhập sai lần 1-4 | Nhập sai đúng định dạng 4 lần liên tiếp | Mỗi lần hiển thị số lần thử còn lại, chưa bị khóa |
| TC-27 | Đăng nhập sai lần thứ 5 | Nhập sai lần thứ 5 liên tiếp | Tài khoản bị khóa ngay lập tức: hiển thị hint khóa, disable input & nút Login |
| TC-28 | Kiểm tra `localStorage` sau khi khóa | Sau TC-27 | `localStorage` có key `lockUntil` = thời điểm hiện tại + 15 phút (dạng timestamp) |
| TC-29 | Đăng nhập thành công trước khi đủ 5 lần sai | Sai 2-4 lần, sau đó nhập đúng | Đăng nhập thành công, biến đếm thất bại được reset về 0, không bị khóa |
| TC-30 | Thử đăng nhập khi đang bị khóa | Tài khoản đang khóa, nhập đúng tài khoản/mật khẩu | Input & nút Login bị disable, không cho submit; hint khóa vẫn hiển thị |
| TC-31 | Reload lại trang khi đang bị khóa | F5/refresh trang trong thời gian khóa | Trang đọc `lockUntil` từ `localStorage`, tiếp tục hiển thị trạng thái khóa (không bị mất khi reload) |
| TC-32 | Mở lại trình duyệt/tab mới cùng domain khi đang khóa | | Trạng thái khóa vẫn được giữ (do lưu ở `localStorage`, không phải session) |
| TC-33 | Hết thời gian khóa (đủ 15 phút) | Chờ đến khi `Date.now() >= lockUntil` | Hint khóa tự ẩn, input & nút Login được enable lại mà không cần reload trang |
| TC-34 | Hết thời gian khóa, thử reload lại trang | Sau khi hết 15 phút, F5 | Không còn hiển thị hint khóa, có thể đăng nhập lại bình thường |
| TC-35 | Đăng nhập sai tiếp sau khi mở khóa | Sau khi hết khóa, sai tiếp 5 lần mới | Biến đếm thất bại tính lại từ đầu (0), tài khoản bị khóa lại bình thường sau đủ 5 lần mới |
| TC-36 | Sửa tay giá trị `lockUntil` trong localStorage về quá khứ | DevTools chỉnh `lockUntil` nhỏ hơn thời gian hiện tại | Hệ thống coi như đã hết hạn khóa, tự động mở khóa |
| TC-37 | Sửa tay giá trị `lockUntil` trong localStorage về tương lai xa | DevTools chỉnh `lockUntil` rất lớn | Tài khoản vẫn bị khóa đến đúng thời điểm đó |
| TC-38 | Xóa `localStorage` khi đang bị khóa | Xóa key `lockUntil`/`failedAttempts` thủ công | Tài khoản được mở khóa ngay (mất trạng thái khóa) |

### E. Kiểm thử giao diện & trải nghiệm người dùng (UI/UX)
| STT | Kịch bản | Kết quả mong đợi |
|---|---|---|
| TC-39 | Hiển thị tổng thể trang | Có đầy đủ: label, input username, input password, nút Login, đúng bố cục |
| TC-40 | Hint khóa mặc định khi mới vào trang (chưa từng đăng nhập) | Hint KHÔNG hiển thị |
| TC-41 | Responsive trên màn hình nhỏ (mobile) | Form hiển thị đầy đủ, không bị vỡ layout |
| TC-42 | Focus vào input | Viền input đổi màu để nhận biết đang focus |
| TC-43 | Input báo lỗi | Viền input chuyển màu đỏ, hiển thị message lỗi ngay dưới input |
| TC-44 | Nút Login khi bị khóa | Nút chuyển màu xám, không click được (`disabled`) |
| TC-45 | Sử dụng bàn phím (nhấn Enter trong ô password) | Submit form giống như bấm nút Login |

### F. Kiểm thử bảo mật cơ bản (Security - mức cơ bản)
| STT | Kịch bản | Kết quả mong đợi |
|---|---|---|
| TC-46 | Nhập script vào username/password (XSS) `<script>alert(1)</script>` | Không thực thi script, dữ liệu chỉ được xử lý như chuỗi văn bản |
| TC-47 | Password không hiển thị dạng plain text trên UI | Input password có `type="password"` |
| TC-48 | Không có thông tin nhạy cảm nào bị lộ qua thông báo lỗi | Thông báo lỗi chung chung "Sai tài khoản hoặc mật khẩu", không tiết lộ username có tồn tại hay không |

### G. Kiểm thử tải dữ liệu mock (users.json)
| STT | Kịch bản | Điều kiện | Kết quả mong đợi |
|---|---|---|---|
| TC-49 | Tải trang thành công, `users.json` hợp lệ | Chạy qua local server | Nút Login được enable sau khi load xong dữ liệu |
| TC-50 | Bấm Login trước khi `users.json` load xong | Click Login ngay lúc trang vừa mở | Nút Login đang disable nên không submit được; nếu cố submit bằng Enter thì hiển thị "Dữ liệu tài khoản chưa sẵn sàng..." |
| TC-51 | `users.json` không tồn tại hoặc lỗi 404 | Xóa/đổi tên file `users.json` | Hiển thị lỗi "Không thể tải dữ liệu tài khoản...", nút Login luôn bị disable |
| TC-52 | `users.json` sai định dạng JSON | Sửa file thành JSON không hợp lệ | Hiển thị lỗi tải dữ liệu tương tự TC-51 |
| TC-53 | Mở trực tiếp `index.html` bằng file:// (không qua server) | Double-click mở file | Trình duyệt chặn `fetch()` do CORS, hiển thị lỗi tải dữ liệu (xem mục Ghi chú để chạy đúng cách) |
| TC-54 | Thêm/sửa tài khoản trong `users.json` rồi tải lại trang | Thêm user mới vào file | Có thể đăng nhập thành công với tài khoản vừa thêm mà không cần sửa `script.js` |

## 3. Ghi chú
- Danh sách tài khoản hợp lệ nằm trong `users.json`, được `script.js` tải bằng `fetch()` khi trang khởi động — không có tài khoản nào hardcode trong mã nguồn JS.
- **Bắt buộc chạy trang qua local server** (không mở trực tiếp file `index.html` bằng đường dẫn `file://`), vì hầu hết trình duyệt (đặc biệt Chrome) chặn `fetch()` đọc file cục bộ do chính sách CORS. Có thể dùng:
  - VS Code: extension "Live Server", hoặc
  - `python -m http.server` rồi truy cập `http://localhost:8000`, hoặc
  - `npx serve` / bất kỳ static server nào khác.
- Có thể dùng DevTools > Application > Local Storage để kiểm tra/điều chỉnh trực tiếp các giá trị `failedAttempts` và `lockUntil` khi thực hiện các test case liên quan đến thời gian khóa (TC-28, TC-33, TC-36, TC-37, TC-38) mà không cần chờ đủ 15 phút thực tế.
- Có thể chỉnh sửa trực tiếp `users.json` để thêm/sửa/xóa tài khoản test mà không cần đụng vào `script.js`.
