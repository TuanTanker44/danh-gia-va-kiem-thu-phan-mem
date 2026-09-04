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

## 3. Trang Đặt vé xe điện (booking.html)

### 3.1 Mô tả chức năng
- Chỉ vào được trang này **sau khi đăng nhập thành công** ở trang login (`index.html` lưu `loggedInUser` vào `sessionStorage` rồi chuyển hướng sang `booking.html`). Vào thẳng URL `booking.html` mà chưa đăng nhập sẽ bị đá về `index.html`.
- **Combo box "Loại vé"**: `Vé thường` / `Vé tiết kiệm`, dữ liệu (tên, giá, mô tả quy tắc, bảng vùng tương đương, bảng giá trị biên) lấy từ `tickets.json` — không hardcode trong `booking.js`. Chọn loại vé nào thì bảng vùng tương đương + bảng giá trị biên bên dưới cập nhật theo loại vé đó.
- **Quy tắc giờ cao điểm / thấp điểm**:
  - Giờ cao điểm: trước 9:30 sáng, hoặc từ 16:00 đến 19:30.
  - Giờ thấp điểm: từ 9:30 đến 16:00, hoặc sau 19:30 đến 24:00.
  - **Vé thường**: dùng được ở mọi khung giờ.
  - **Vé tiết kiệm**: chỉ hợp lệ khi **cả** Giờ đi (from) và Giờ về (to) đều nằm trong khung giờ thấp điểm. Chỉ cần 1 trong 2 mốc rơi vào giờ cao điểm là phải chuyển sang Vé thường.
- **Form**: 2 trường `Giờ đi (from)` và `Giờ về (to)` (input `type="time"`). Nhập đủ 2 trường + chọn loại vé hợp lệ thì dòng giá vé cập nhật và nút "Mua vé" được bật.
- **Sau khi mua vé**: ghi vé (loại vé, from, to, giá, thời điểm mua) vào đúng user (theo `loggedInUser`) và lưu **mô phỏng** toàn bộ mảng `users` (đã có vé mới) vào `localStorage` (key `usersMirror`) — vì trình duyệt không thể tự ghi file thật. Trang hiển thị nội dung JSON mới trong ô textarea kèm nút "Sao chép nội dung" để người dùng tự dán đè vào `users.json` nếu cần, và nút "Đặt lại dữ liệu mô phỏng" để xoá `usersMirror` và nạp lại đúng `users.json` gốc.

### 3.2 Danh sách kịch bản kiểm thử

#### A. Kiểm soát truy cập / phiên đăng nhập
| STT | Kịch bản | Điều kiện | Kết quả mong đợi |
|---|---|---|---|
| BK-01 | Truy cập trực tiếp `booking.html` khi chưa đăng nhập | Chưa có `loggedInUser` trong `sessionStorage` | Tự động chuyển hướng về `index.html` |
| BK-02 | Vào `booking.html` ngay sau khi đăng nhập thành công | Đăng nhập đúng ở `index.html` | Hiển thị đúng "Xin chào, {username}" |
| BK-03 | Bấm "Đăng xuất" trên `booking.html` | | Xóa `loggedInUser` khỏi `sessionStorage`, chuyển về `index.html`; nếu vào lại `booking.html` sẽ bị đá về login |
| BK-04 | Đóng tab/trình duyệt rồi mở lại `booking.html` | `sessionStorage` bị xóa khi đóng trình duyệt | Bị chuyển về trang login (đúng bản chất `sessionStorage`, khác với `localStorage`) |

#### B. Combo box loại vé & bảng vùng tương đương / giá trị biên
| STT | Kịch bản | Điều kiện | Kết quả mong đợi |
|---|---|---|---|
| BK-05 | Mặc định khi vào trang | | Loại vé đầu tiên (Vé thường) được chọn sẵn, bảng EC + bảng boundary hiển thị đúng dữ liệu của Vé thường |
| BK-06 | Chọn "Vé tiết kiệm" trong combo box | | Mô tả quy tắc, bảng vùng tương đương và bảng giá trị biên cập nhật lại đúng theo Vé tiết kiệm |
| BK-07 | Đối chiếu nội dung bảng với `tickets.json` | | Số dòng, khoảng giờ, kết quả mong đợi trong bảng khớp 100% với `equivalenceClasses`/`boundaryValues` trong file JSON tương ứng |
| BK-08 | Đổi qua lại nhiều lần giữa 2 loại vé | | Bảng luôn cập nhật đúng, không bị giữ lại dữ liệu của loại vé trước |

#### C. Kiểm thử biên giờ đi/giờ về (Boundary Value Analysis)
| STT | Kịch bản | from | to | Loại vé chọn | Kết quả mong đợi |
|---|---|---|---|---|---|
| BK-09 | Cả 2 mốc trong giờ cao điểm sáng | 09:00 | 09:20 | Vé tiết kiệm | Báo lỗi "...chỉ được mua Vé thường", nút Mua vé bị disable |
| BK-10 | from = 09:29 (ngay trước biên off-peak) | 09:29 | 09:40 | Vé tiết kiệm | Vẫn là giờ cao điểm → báo lỗi tương tự BK-09 |
| BK-11 | from = 09:30 (đúng biên bắt đầu off-peak) | 09:30 | 10:00 | Vé tiết kiệm | Hợp lệ, hiển thị giá Vé tiết kiệm |
| BK-12 | to = 15:59 (ngay trước biên kết thúc off-peak) | 10:00 | 15:59 | Vé tiết kiệm | Hợp lệ |
| BK-13 | to = 16:00 (đúng biên chuyển sang cao điểm chiều) | 10:00 | 16:00 | Vé tiết kiệm | Không hợp lệ (16:00 tính là giờ cao điểm) → báo lỗi |
| BK-14 | to = 16:01 | 10:00 | 16:01 | Vé tiết kiệm | Không hợp lệ, báo lỗi |
| BK-15 | from = 19:29 (còn cao điểm) | 19:29 | 20:00 | Vé tiết kiệm | Không hợp lệ vì from rơi vào cao điểm |
| BK-16 | from = 19:30 (đúng biên bắt đầu off-peak tối) | 19:30 | 20:00 | Vé tiết kiệm | Hợp lệ |
| BK-17 | to = 23:59 (cuối ngày) | 20:00 | 23:59 | Vé tiết kiệm | Hợp lệ |
| BK-18 | from ở giờ cao điểm, to ở giờ thấp điểm (chỉ 1 mốc sai) | 09:00 | 10:00 | Vé tiết kiệm | Không hợp lệ (chỉ cần 1 mốc rơi vào cao điểm) |
| BK-19 | Bất kỳ khung giờ nào | 09:00 | 09:20 | Vé thường | Luôn hợp lệ, hiển thị đúng giá Vé thường (không phụ thuộc giờ) |
| BK-20 | to nhỏ hơn hoặc bằng from | 10:00 | 09:00 | bất kỳ | Báo lỗi "Giờ về phải sau Giờ đi.", nút Mua vé bị disable |
| BK-21 | to bằng from | 10:00 | 10:00 | bất kỳ | Báo lỗi tương tự BK-20 |
| BK-22 | Chưa nhập đủ from/to | để trống | để trống hoặc có giá trị | bất kỳ | Dòng giá vé hiển thị "--", nút Mua vé bị disable |

#### D. Kiểm thử mua vé & ghi ngược dữ liệu (users.json mô phỏng)
| STT | Kịch bản | Điều kiện | Kết quả mong đợi |
|---|---|---|---|
| BK-23 | Mua vé thành công lần đầu | Chọn loại vé + giờ hợp lệ, bấm "Mua vé" | Hiển thị thông báo thành công kèm tên loại vé & giá; khu vực "Dữ liệu users.json sau khi mua vé" hiện ra |
| BK-24 | Kiểm tra nội dung textarea sau khi mua | Sau BK-23 | JSON hiển thị đúng toàn bộ mảng user, user hiện tại có thêm object trong mảng `tickets` với đủ `type`, `from`, `to`, `price`, `purchasedAt` |
| BK-25 | Mua vé lần thứ 2 (cùng phiên) | Sau BK-23, đổi giờ rồi mua tiếp | Mảng `tickets` của user có thêm 1 phần tử mới, không mất phần tử cũ |
| BK-26 | Reload lại trang sau khi đã mua vé | F5 sau BK-23 | Dữ liệu vé đã mua vẫn còn (đọc từ `localStorage.usersMirror`), không bị mất |
| BK-27 | Bấm "Sao chép nội dung" | Sau khi mua vé | Nội dung textarea được copy vào clipboard, hiển thị thông báo xác nhận |
| BK-28 | Bấm "Đặt lại dữ liệu mô phỏng" | | Xóa `usersMirror` khỏi `localStorage`, nạp lại đúng dữ liệu gốc từ `users.json`, ẩn khu vực textarea |
| BK-29 | Mua vé với user không tồn tại trong `users.json` | Sửa `loggedInUser` trong DevTools thành username lạ rồi F5 | Hiển thị lỗi "Không tìm thấy tài khoản ... trong dữ liệu users.json." |
| BK-30 | `tickets.json` hoặc `users.json` lỗi/không tải được | Đổi tên file hoặc sửa sai định dạng JSON | Hiển thị lỗi "Không thể tải dữ liệu...", trang không cho thao tác tiếp |
| BK-31 | Mở `booking.html` trực tiếp bằng `file://` | Không qua local server | `fetch()` bị chặn do CORS, hiển thị lỗi tải dữ liệu tương tự BK-30 |

## 4. Ghi chú chung
- Danh sách tài khoản hợp lệ nằm trong `users.json`, được cả `script.js` (login) và `booking.js` tải bằng `fetch()` — không có tài khoản hay giá vé nào hardcode trong mã nguồn JS; giá vé + quy tắc giờ cao điểm/thấp điểm nằm trong `tickets.json`.
- **Bắt buộc chạy toàn bộ project qua local server** (không mở trực tiếp file `.html` bằng đường dẫn `file://`), vì hầu hết trình duyệt (đặc biệt Chrome) chặn `fetch()` đọc file cục bộ do chính sách CORS. Có thể dùng:
  - VS Code: extension "Live Server", hoặc
  - `python -m http.server` rồi truy cập `http://localhost:8000`, hoặc
  - `npx serve` / bất kỳ static server nào khác.
- Có thể dùng DevTools > Application > Local Storage để kiểm tra/điều chỉnh trực tiếp các giá trị `failedAttempts`, `lockUntil` (trang login, TC-28, TC-33, TC-36, TC-37, TC-38) và `usersMirror` (trang booking, nhóm BK-23 → BK-28) mà không cần chờ hết 15 phút thực tế hay thao tác lại nhiều lần.
- Có thể dùng DevTools > Application > Session Storage để xem/xóa `loggedInUser` khi kiểm thử nhóm BK-01 → BK-04.
- Có thể chỉnh sửa trực tiếp `users.json` để thêm/sửa/xóa tài khoản test, hoặc `tickets.json` để thay đổi giá vé/khung giờ mà không cần đụng vào mã nguồn JS.
