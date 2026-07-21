# BMC Web Admin Demo

Frontend demo độc lập, chỉ sử dụng HTML, CSS và JavaScript thuần. Không cần build và không có backend.

## Chạy local

Tại thư mục `web-admin`:

```bash
python3 -m http.server 4173
```

Mở `http://localhost:4173`.

## Tài khoản demo

- Tên đăng nhập: `admin`
- Mật khẩu: `admin123`
- Mã OTP: `123456`

## Deploy Render

### Cách 1: Static Site

1. Tạo **New Static Site** và kết nối repository.
2. Đặt **Root Directory** là `web-admin`.
3. Để trống **Build Command**.
4. Đặt **Publish Directory** là `.`.
5. Deploy.

### Cách 2: Blueprint

Khi tạo Blueprint, chọn file `web-admin/render.yaml`.

## Lưu ý

- Toàn bộ dữ liệu và thao tác lưu/xoá trong giao diện là mô phỏng.
- Trạng thái đăng nhập demo được lưu trong `localStorage`/`window.name` của trình duyệt.
- Bản production cần backend cho xác thực, phân quyền, lưu dữ liệu, audit log và kiểm soát upload.
