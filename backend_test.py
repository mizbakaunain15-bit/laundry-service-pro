import requests
import sys
import json
from datetime import datetime

class WashCareProAPITester:
    def __init__(self, base_url="https://laundry-service-pro.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                expected_message = "WashCare Pro API - Washing Machine Repair Services"
                if data.get("message") == expected_message:
                    self.log_test("Root Endpoint", True)
                    return True
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected message: {data}")
                    return False
            else:
                self.log_test("Root Endpoint", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Error: {str(e)}")
            return False

    def test_create_booking(self):
        """Test POST /api/bookings endpoint"""
        test_booking = {
            "name": "Test Customer",
            "phone": "9876543210",
            "service": "repair",
            "message": "Test booking for washing machine repair"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/bookings", 
                json=test_booking,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                # Check if response has required fields
                required_fields = ["id", "name", "phone", "service", "status", "created_at"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    self.log_test("Create Booking", True)
                    return data["id"]  # Return booking ID for further tests
                else:
                    self.log_test("Create Booking", False, f"Missing fields: {missing_fields}")
                    return None
            else:
                self.log_test("Create Booking", False, f"Status: {response.status_code}, Response: {response.text}")
                return None
                
        except Exception as e:
            self.log_test("Create Booking", False, f"Error: {str(e)}")
            return None

    def test_get_bookings(self):
        """Test GET /api/bookings endpoint"""
        try:
            response = requests.get(f"{self.api_url}/bookings", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get All Bookings", True, f"Found {len(data)} bookings")
                    return True
                else:
                    self.log_test("Get All Bookings", False, "Response is not a list")
                    return False
            else:
                self.log_test("Get All Bookings", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Get All Bookings", False, f"Error: {str(e)}")
            return False

    def test_get_booking_by_id(self, booking_id):
        """Test GET /api/bookings/{id} endpoint"""
        if not booking_id:
            self.log_test("Get Booking by ID", False, "No booking ID provided")
            return False
            
        try:
            response = requests.get(f"{self.api_url}/bookings/{booking_id}", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                if data.get("id") == booking_id:
                    self.log_test("Get Booking by ID", True)
                    return True
                else:
                    self.log_test("Get Booking by ID", False, f"ID mismatch: expected {booking_id}, got {data.get('id')}")
                    return False
            else:
                self.log_test("Get Booking by ID", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Get Booking by ID", False, f"Error: {str(e)}")
            return False

    def test_create_status_check(self):
        """Test POST /api/status endpoint"""
        test_status = {
            "client_name": "Test Client"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/status", 
                json=test_status,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                required_fields = ["id", "client_name", "timestamp"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    self.log_test("Create Status Check", True)
                    return True
                else:
                    self.log_test("Create Status Check", False, f"Missing fields: {missing_fields}")
                    return False
            else:
                self.log_test("Create Status Check", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Create Status Check", False, f"Error: {str(e)}")
            return False

    def test_get_status_checks(self):
        """Test GET /api/status endpoint"""
        try:
            response = requests.get(f"{self.api_url}/status", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Status Checks", True, f"Found {len(data)} status checks")
                    return True
                else:
                    self.log_test("Get Status Checks", False, "Response is not a list")
                    return False
            else:
                self.log_test("Get Status Checks", False, f"Status: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Get Status Checks", False, f"Error: {str(e)}")
            return False

    def test_booking_validation(self):
        """Test booking validation with missing fields"""
        invalid_booking = {
            "name": "Test Customer"
            # Missing required fields: phone, service
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/bookings", 
                json=invalid_booking,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # Should return 422 for validation error
            success = response.status_code == 422
            
            if success:
                self.log_test("Booking Validation", True, "Correctly rejected invalid booking")
                return True
            else:
                self.log_test("Booking Validation", False, f"Expected 422, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Booking Validation", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print(f"🧪 Starting WashCare Pro API Tests")
        print(f"🌐 Testing API at: {self.api_url}")
        print("=" * 50)
        
        # Test basic connectivity
        self.test_root_endpoint()
        
        # Test booking endpoints
        booking_id = self.test_create_booking()
        self.test_get_bookings()
        self.test_get_booking_by_id(booking_id)
        self.test_booking_validation()
        
        # Test status endpoints
        self.test_create_status_check()
        self.test_get_status_checks()
        
        # Print summary
        print("=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return 1

def main():
    tester = WashCareProAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())